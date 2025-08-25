import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidCard } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { fetchWishlist, resetWishlistOperation } from '../../redux/Slices/wishlistSlice';
import WishlistCard from "../WishlistCard";
import LoadingPage from "../Loader/LoadingPage";
import PopUp from "../Shared/popup/PopUp";

const WishlistSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const { items, loading, error } = useSelector((state) => state.wishlist);
  const currentLang = useSelector((state) => state.language.currentLang) || "en";

  useEffect(() => {
    const params = {
      lang_code: currentLang,
      currency_code: "USD",
      trip_type: 1,
      client_id: ""
    };

    dispatch(fetchWishlist(params));
  }, [dispatch, currentLang]);

  useEffect(() => {
    if (error) {
      console.log('Error detected:', error);
        setPopupMessage(error.message || t("wishlist.loadError"));
        setPopupType('error');
        setShowPopup(true);

        dispatch(resetWishlistOperation());
    }
  }, [error, t, dispatch]);

   useEffect(() => {
    return () => {
      dispatch(resetWishlistOperation());
      };
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (items.length === 0 && !loading) {
    return (
      <section className="tours-section">
        <Container>
          <div className="tours-empty">
            <BiSolidCard className="empty-icon" />
            <h3 className="empty-title">{t('tours.empty_title')}</h3>
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
          <div className="section-header">
            <h2 className="section-title">{t('wishlist.title')}</h2>
            <div className="section-divider"></div>
          </div>

          <div className="tours-grid">
            <Row>
              {items.map((trip) => (
                <Col key={trip.trip_id} lg={4} md={6} className="d-flex">
                  <WishlistCard trip={trip} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* Show popup for messages */}
      {showPopup && (
        <PopUp
          show={showPopup}
          closeAlert={() => setShowPopup(false)}
          msg={popupMessage}
          type={popupType}
          autoClose={popupType === 'success' ? 3000 : false}
          showConfirmButton={false}
        />
      )}
    </>
  );
};

export default WishlistSection;