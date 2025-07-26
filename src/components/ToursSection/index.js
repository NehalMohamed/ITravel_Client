import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import TourCard from "../TourCard";

const ToursSection = () => {
  const { tours, loading } = useSelector((state) => state.tours);
    const { t } = useTranslation();

  if (loading) {
    return (
      <section className="tours-section">
        <Container>
          <div className="tours-loading">
            <div>
              <Spinner animation="border" role="status" />
              <div className="loading-text">{t('tours.loading')}</div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (tours.length === 0) {
    return (
      <section className="tours-section">
        <Container>
          <div className="tours-empty">
            <FaMapMarkerAlt className="empty-icon" />
            <h3 className="empty-title">{t('tours.empty_title')}</h3>
            <p className="empty-text">{t('tours.empty_text')}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="tours-section" id="tours">
      <Container>
        <div className="section-header">
          <h2 className="section-title">{t('tours.top_offers')}</h2>
          <div className="section-divider"></div>
        </div>

        <div className="tours-grid">
          <Row>
            {tours.map((tour) => (
              <Col key={tour.id} lg={4} md={6} className="d-flex">
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ToursSection;
