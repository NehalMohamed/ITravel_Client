import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidCard } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { fetchToursSectionTrips } from "../../redux/Slices/tripsSlice";
import { resetWishlistOperation } from "../../redux/Slices/wishlistSlice";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../Shared/popup/PopUp";
import TourCard from "../TourCard";
import { Link } from "react-router-dom";

const ToursSection = (props) => {
  const dispatch = useDispatch();
  const tripType = props.tripType || 0;
  const {
    toursSectionTrips: trips,
    loading,
    error,
  } = useSelector((state) => state.trips);
  const { operation } = useSelector((state) => state.wishlist);
  // const currentLang = useSelector((state) => state.language.currentLang) || "en";
  const currentLang = localStorage.getItem("lang") || "de";
  const { user: stateUser } = useSelector((state) => state.auth); // Get user from auth state

  // Get user from localStorage as fallback
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "null");
  const user = stateUser || localStorageUser;

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("alert");
  const { t } = useTranslation();

  useEffect(() => {
    const params = {
      lang_code: currentLang,
      show_in_top: true,
      currency_code: "EUR",
      client_id: user?.id || "",
      trip_type: tripType,
    };
    dispatch(fetchToursSectionTrips(params));
  }, [dispatch, currentLang, refreshTrigger, tripType]);

  useEffect(() => {
    if (operation.success) {
      // Refetch trips after successful wishlist operation
      setRefreshTrigger((prev) => prev + 1);
      dispatch(resetWishlistOperation());
    }
  }, [operation.success, dispatch]);

  useEffect(() => {
    // Handle errors in the parent component only
    console.log("operation.error ", operation.error);
    if (operation.error) {
      setPopupMessage(operation.error);
      setPopupType("alert");
      setShowPopup(true);

      // Reset operation error after showing
      setTimeout(() => {
        dispatch(resetWishlistOperation());
      }, 100);
    }
  }, [operation.error, dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (trips.length === 0 && !loading) {
    return (
      <section className="tours-section">
        <Container>
          <div className="tours-empty">
            <BiSolidCard className="empty-icon" />
            <h3 className="empty-title">{t("tours.empty_title")}</h3>
            {/* <p className="empty-text">{t('tours.empty_text')}</p> */}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="tours-section" id="tours">
        <Container>
          <div className="d-flex justify-content-between">
            <div className="section-header">
              <h2 className="section-title">{t("tours.top_offers")}</h2>
              <div className="section-divider"></div>
            </div>
            {/* <Button className="transBtn primaryBtn">{t("tours.ShowAll")}</Button> */}
          </div>

          <div className="tours-grid">
            <Row>
              {trips.map((trip) => (
                <Col key={trip.trip_id} lg={4} md={6} className="d-flex">
                  <Link
                    className="w-100"
                    to={
                      !trip.is_comm_soon
                        ? `/trip/${trip.route}`
                        : "/trip/ComingSoon"
                    }
                    state={{
                      tripId: trip.trip_id,
                      trip_type: trip.trip_type,
                    }}
                  >
                    <TourCard trip={trip} />
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* Single popup in the parent component */}
      {showPopup && (
        <PopUp
          show={showPopup}
          closeAlert={() => setShowPopup(false)}
          msg={popupMessage}
          type={popupType}
          autoClose={false}
          showConfirmButton={false}
        />
      )}
    </>
  );
};

export default ToursSection;
