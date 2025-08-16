import { Card, Button } from "react-bootstrap";
import { FaCheck, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { bookTour, toggleWishlist } from "../../redux/store/toursSlice";

const TourCard = ({ tour }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBooking = () => {
    dispatch(bookTour(tour.id));
    alert(`Tour "${tour.title}" wurde gebucht!`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(tour.id));
  };

  return (
    <Card className="tour-card h-100">
      <div className="card-img-container">
        <Card.Img variant="top" src={tour.image} alt={tour.title} />
        <button
          className={`wishlist-heart ${tour.isLiked ? "liked" : ""}`}
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <FaHeart />
        </button>
      </div>

      <Card.Body className="card-content">
        <Card.Title className="tour-title">{tour.title}</Card.Title>
        <Card.Text className="tour-description">{tour.description}</Card.Text>

        <ul className="feature-list flex-grow-1">
          {tour.features.map((feature, index) => (
            <li key={index} className="feature-item">
              <FaCheck className="check-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="card-footer-content">
          <Button variant="outline-primary" onClick={() => navigate("/tripDetails")} className="book-btn">
            {t("general.show_more")}
          </Button>
          <div className="price-section">
            <span className="price-label">ab</span>
            <span className="price">{tour.price}</span>
            <span className="price-suffix">€ p.P.</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TourCard;
