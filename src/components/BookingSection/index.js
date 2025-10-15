import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { BiSolidCard } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingList } from '../../redux/Slices/bookingListSlice';
import { cancelBooking } from '../../redux/Slices/bookingCancelSlice';
import BookingCard from '../BookingCard';
import LoadingPage from '../Loader/LoadingPage';
import PopUp from '../Shared/popup/PopUp';

const BookingSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items: allBookings, loading, error } = useSelector((state) => state.bookingList);
  const { loading: cancelLoading, success: cancelSuccess, error: cancelError } = useSelector((state) => state.bookingCancel);
    
  const currentLang = useSelector((state) => state.language.currentLang) || "en";

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('alert');
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const observer = useRef();
  const BOOKINGS_PER_PAGE = 9;

  // Function to refresh bookings
  const refreshBookings = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const clientId = user?.id;

    if (clientId) {
      dispatch(fetchBookingList({
        lang_code: currentLang,
        currency_code: "EUR"
      }));
    }
  }, [dispatch, currentLang]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  // Handle fetch errors
  useEffect(() => {
    if (error) {
      setPopupMessage(error || t('bookings.fetchError'));
      setPopupType('alert');
      setShowPopup(true);
    }
  }, [error, t]);
  
  // Handle cancel booking success/error
   useEffect(() => {
      if (cancelSuccess) {
        setPopupMessage(t('bookings.cancel.cancelSuccess'));
        setPopupType('alert');
        setShowPopup(true);
        setShowCancelConfirm(false);
        setSelectedBooking(null);
        // Refresh the bookings list
        refreshBookings();
      }
      
      if (cancelError) {
        setPopupMessage(cancelError || t('bookings.cancel.cancelError'));
        setPopupType('alert');
        setShowPopup(true);
        setShowCancelConfirm(false);
      }
    }, [cancelSuccess, cancelError, t, refreshBookings]);

  // Pagination logic
  useEffect(() => {
    if (allBookings && allBookings.length > 0) {
      const startIndex = 0;
      const endIndex = Math.min(currentPage * BOOKINGS_PER_PAGE, allBookings.length);
      setDisplayedBookings(allBookings.slice(0, endIndex));
      setHasMore(endIndex < allBookings.length);
    } else {
      setDisplayedBookings([]);
      setHasMore(false);
    }
  }, [allBookings, currentPage]);

  // Infinite scroll observer
  const lastBookingElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setCurrentPage(prevPage => prevPage + 1);
          setIsLoadingMore(false);
        }, 500); // Small delay for better UX
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

   // Handle cancel booking confirmation
    const handleCancelBooking = (booking) => {
      setSelectedBooking(booking);
      setShowCancelConfirm(true);
    };
  
    // Confirm cancel booking
    const confirmCancelBooking = () => {
      if (selectedBooking) {
        dispatch(cancelBooking(selectedBooking.booking_id));
      }
    };
  
    // Cancel confirmation dialog
    const handleCancelConfirmation = () => {
      setShowCancelConfirm(false);
      setSelectedBooking(null);
    };

  if (loading && currentPage === 1) {
    return <LoadingPage />;
  }

  if (allBookings && allBookings.length === 0 && !loading) {
    return (
      <section className="bookings-section">
        <Container>
          <div className="bookings-empty">
            <BiSolidCard className="empty-icon" />
            <h3 className="empty-title">{t('bookings.noBookings')}</h3>
            <p className="empty-text">{t('bookings.noBookingsText')}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bookings-section" id="bookings">
        <Container>
          <div className="section-header">
            <h2 className="section-title">{t('bookings.myBookings')}</h2>
            <div className="section-divider"></div>
            {/* {allBookings && allBookings.length > 0 && (
              <p className="bookings-count">
                {t('bookings.totalBookings')}: {allBookings.length}
              </p>
            )} */}
          </div>

          <div className="bookings-grid">
            <Row>
              {displayedBookings.map((booking, index) => {
                if (displayedBookings.length === index + 1) {
                  return (
                    <Col 
                      key={booking.booking_id} 
                      lg={4} 
                      xl={4} 
                      className="d-flex mb-4"
                      ref={lastBookingElementRef}
                    >
                      <BookingCard 
                      booking={booking} 
                      onCancelBooking={handleCancelBooking}
                      />
                    </Col>
                  );
                } else {
                  return (
                    <Col key={booking.booking_id} lg={4} xl={4} className="d-flex mb-4">
                       <BookingCard 
                        booking={booking} 
                        onCancelBooking={handleCancelBooking}
                      />
                    </Col>
                  );
                }
              })}
            </Row>
          </div>

          {isLoadingMore && (
            <div className="text-center mt-4">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{t('general.loading')}</span>
              </Spinner>
              <p className="mt-2">{t('general.loadingMore')}</p>
            </div>
          )}

          {/* {!hasMore && displayedBookings.length > 0 && (
            <div className="text-center mt-4">
              <p className="text-muted">{t('bookings.allBookingsLoaded')}</p>
            </div>
          )} */}
        </Container>
      </section>

      {/* Error Popup */}
      {showPopup && (
        <PopUp
          show={showPopup}
          closeAlert={() => setShowPopup(false)}
          msg={popupMessage}
          type={popupType}
          autoClose={false}
        />
      )}

      {/* Cancel Confirmation Popup */}
            {showCancelConfirm && (
              <PopUp
                show={showCancelConfirm}
                closeAlert={handleCancelConfirmation}
                msg={
                  <div>
                    <p>{t('bookings.cancel.cancelConfirmation1')}</p>
                    <p>{t('bookings.cancel.cancelConfirmation2')}</p>
                    <p><strong>{t('bookings.cancel.cancelConfirmation3')}</strong></p>
                  </div>
                }
                type="confirm"
                autoClose={false}
                confirmText={t('general.yes')}
                cancelText={t('general.no')}
                onConfirm={confirmCancelBooking}
                onCancel={handleCancelConfirmation}
                isLoading={cancelLoading}
              />
            )}
    </>
  );
};

export default BookingSection;