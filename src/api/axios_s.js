import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Swal from "sweetalert2";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../helper/TokenHelper";
const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL_AUTH = process.env.REACT_APP_AUTH_API_URL;
// create instance
const api = axios.create({
  baseURL: BASE_URL,
  //withCredentials: true, // important for cookie refresh token
});
let showingLoginAlert = false; // prevent showing multiple alerts
// 🟢 Request Interceptor — safely attach token if exists
// api.interceptors.request.use(
//   (config) => {
//     let lang = localStorage.getItem("lang");
//     let user = JSON.parse(localStorage.getItem("user"));
//     let token = user?.accessToken;

//     console.log("token ", token);
//     config.headers["Content-Type"] = "application/json";

//     // ✅ Only attach token if `config.skipAuth` is NOT true
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // 🛑 STOP request if token is missing and request requires auth
//     if (!token) {
//       if (!showingLoginAlert) {
//         showingLoginAlert = true;

//         // Swal.fire({
//         //   icon: "warning",
//         //   title: "Login Required",
//         //   text: "You must log in to continue.",
//         //   confirmButtonText: "Go to Login",
//         //   confirmButtonColor: "#015FC9",
//         //   allowOutsideClick: false,
//         // }).then(() => {
//         //   localStorage.removeItem("token");
//         //   localStorage.removeItem("user");
//         //   showingLoginAlert = false;

//         //   setTimeout(() => {
//         //     window.location.href = "/auth";
//         //   }, 100);
//         // });
//       }

//       // ❗ THIS PREVENTS THE API REQUEST FROM EXECUTING
//       return Promise.reject();
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.request.use(
  (config) => {
    let lang = localStorage.getItem("lang");
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user?.accessToken;

   // console.log("token ", token);
    config.headers["Content-Type"] = "application/json";

    // ✅ Only attach token if `config.skipAuth` is NOT true
    if (token) {
      //console.log("request 1 ");
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    // 🚫 If request requires auth but token is missing, show alert
    if (!token && !showingLoginAlert) {
      //console.log("request 2 ");
      showingLoginAlert = true;
      localStorage.setItem("redirect_after_login", window.location.pathname);
      // 🧠 Show popup for user to log in first
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must log in to continue.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#015FC9",
        allowOutsideClick: false,
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        //window.location.href = "/auth";
        showingLoginAlert = false;
        setTimeout(() => {
          window.location.href = "/auth";
        }, 100);
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let isRefreshing = false;
let failedQueue = [];
// When multiple API requests fail at the same time (access token expired),
// we don’t want to refresh the token multiple times — just once,
// and queue the others until it’s done.
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};
// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    //console.log("originalRequest.url ", originalRequest?.url);
    // Skip refresh for login/register endpoints
    if (
      originalRequest?.url.includes("/api/LoginUser") ||
      originalRequest?.url.includes("/api/RegisterUser") ||
      originalRequest?.url.includes("/api/ConfirmOTP") ||
      originalRequest?.url.includes("/api/LoginGmail") ||
      originalRequest?.url.includes("/api/ExternalRegister")
    ) {
      return Promise.reject(error);
    }
    //console.log("error.response?.status", error.response?.status);
    // Handle unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to finish, then retry
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        //console.log("start get refresh");
        // token refresh
        // const refreshResponse = await authApi.post("/refresh");
        // console.log("refreshResponse ", refreshResponse);
        // const newToken = refreshResponse?.data?.user?.accessToken;

        // setAccessToken(newToken);
        const user = JSON.parse(localStorage.getItem("user"));
        const oldAccessToken = user?.accessToken;
        const oldRefreshToken = user?.refreshToken;

        const refreshResponse = await axios.post(BASE_URL_AUTH + "/refresh", {
          AccessToken: oldAccessToken,
          RefreshToken: oldRefreshToken,
        });

        //console.log("refreshResponse ", refreshResponse);
        const newToken = refreshResponse?.data?.user?.accessToken;
        const newRefesh = refreshResponse?.data?.user?.refreshToken;
        localStorage.setItem(
          "user",
          JSON.stringify(refreshResponse?.data?.user)
        );
        processQueue(null, newToken);

        // Retry original request
        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        return api(originalRequest);
      } catch (refreshError) {
        // 🚨 Refresh failed → clear tokens and redirect
        processQueue(refreshError, null);
        clearAccessToken();
        //window.location.href = "/Auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Other errors
    return Promise.reject(error);
  }
);

export default api;
