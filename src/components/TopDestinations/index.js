import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinations } from "../../redux/Slices/destinationsSlice";
import { Link } from "react-router-dom";
const TopDestinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageErrors, setImageErrors] = useState({});
  const { items: destinations, loading } = useSelector(
    (state) => state.destinations
  );

  // const currentLang =
  //   useSelector((state) => state.language.currentLang) || "en";
  const currentLang = localStorage.getItem("lang") || "de";
  useEffect(() => {
    dispatch(fetchDestinations(currentLang));
  }, [dispatch, currentLang]);

  const handleDestinationClick = (destination) => {
    navigate(
      `/excursions/${destination.route.toLowerCase().replace(/\s+/g, "-")}`,
      {
        state: { DestinationId: destination.destination_id },
      }
    );
  };

  const handleImageError = (destinationId) => {
    setImageErrors((prev) => ({
      ...prev,
      [destinationId]: true,
    }));
  };

  const renderDestinationCard = (destination, index) => (
    <Col
      key={destination.destination_id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      //className={`destination-col ${index >= 4 ? "second-row" : "first-row"}`}
    >
      <div className="tour-card-wrapper">
        <Card className="tour-card border-0">
          <Card.Img
            src={destination.img_path || "/images/default-destination.jpg"}
            className="card-img"
          />

          {/* Overlay on hover */}
          <div className="card-overlay">
            <h3 className="overlay-title">{destination.dest_name}</h3>
            <Link
              className="overlay-link"
              to={`/excursions/${destination.route
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              state={{
                state: { DestinationId: destination.destination_id },
              }}
            >
              {t("tours.ViewAllTours")}
            </Link>
          </div>

          {/* Title and image only (default view) */}
          <div className="card-title-bottom">
            <h4>{destination.dest_name}</h4>
          </div>
        </Card>
      </div>
    </Col>
  );

  if (loading) {
    return (
      <section className="top-destinations">
        <Container>
          <div className="section-header">
            <h2 className="section-title">{t("wishlist.topCities")}</h2>
            <p className="section-subtitle">
              {t("wishlist.topCitiesDescription")}
            </p>
          </div>
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="top-destinations">
      <Container>
        <div className="section-header">
          <h2 className="section-title">{t("wishlist.topDestinations")}</h2>
          <div className="section-divider"></div>
          {/* <p className="section-subtitle">
            {t("wishlist.topDestinationsDescription")}
          </p> */}
        </div>

        <Row className="destinations-grid">
          {destinations.map((destination, index) =>
            renderDestinationCard(destination, index)
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TopDestinations;
