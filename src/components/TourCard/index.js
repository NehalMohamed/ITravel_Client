import { Card } from "react-bootstrap";
import { FaRegHeart, FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../redux/Slices/wishlistSlice";
import { Rating } from "../../helper/TripHelper";
import "./TourCard.scss";

export default function TourCard({ trip }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const currentLang = useSelector((state) => state.language.currentLang) || "en";
  const currentLang = localStorage.getItem("lang") || "de";
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault(); // stop navigation
    e.stopPropagation();
    const user = JSON.parse(localStorage.getItem("user"));

    const wishlistData = {
      id: trip?.wish_id,
      trip_id: trip?.trip_id,
      client_id: user ? user.id : 0,
      created_at: null,
      trip_type: trip?.trip_type,
      delete: trip?.isfavourite, // true to remove, false to add
    };
    dispatch(addToWishlist(wishlistData));
  };
  // Function to format price display based on trip type
  const renderPrice = () => {
    const currencySymbol =
      trip?.currency_code.toUpperCase() === "EUR" ? "€" : trip?.currency_code;

    return (
      <span className="price-label">
        {trip?.trip_min_price} {currencySymbol}
      </span>
    );
  };
  return (
    <Card className="tour-card">
      <div className="image-figure">
        <Card.Img
          src={trip?.default_img}
          alt={trip?.trip_name}
          className="tour-img"
        />
        <button
          className={`wishlist-btn ${trip?.isfavourite ? "liked" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={
            trip?.isfavourite
              ? t("tripDetails.removeFromWishlist")
              : t("tripDetails.addToWishlist")
          }
        >
          <FaRegHeart />
        </button>
      </div>

      <Card.Body>
        {/* Location */}
        <div className="location">
          <FaMapMarkerAlt />
          <span>{trip?.dest_name}</span>
        </div>

        {/* Title */}
        <Card.Title className="tour-title hover-line">
          {trip?.trip_name}
        </Card.Title>

        <div className="info-row">
          {/* Rating */}
          <div className="rating">
            {Rating(trip?.review_rate)}
            <span>
              {trip?.review_rate} ({trip?.total_reviews})
            </span>
          </div>

          <div className="price">
            {t("general.from")} <strong>{renderPrice()}</strong>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
