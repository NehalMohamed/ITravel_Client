import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import Home from "./pages/HomePage";
import Wishlist from "./pages/WishlistPage";
import NotFound from "./components/NotFound";
import NoResults from "./components/NoResults";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ComingSoon from "./components/ComingSoon";
import Excursions from "./pages/ExcursionsPage";
import DestinationExcursionsPage from "./pages/DestinationExcursionsPage";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import AuthComp from "./components/AuthComp/AuthComp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes with navbar and footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/NoResults" element={<NoResults />} />
            <Route path="/Auth" element={<AuthComp />} />
            <Route path="/Contact" element={<ContactPage />} />
            <Route path="/AboutUs" element={<AboutPage />} />

            <Route path="/excursions" element={<Excursions />} />
            <Route path="/excursions/:location" element={<DestinationExcursionsPage />} />



            <Route path="/ComingSoon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Routes without navbar and footer */}
          <Route element={<MinimalLayout />}>
            {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
