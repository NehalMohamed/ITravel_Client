import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const CityCard = ({ image, name, reviews, rating, oldPrice, newPrice }) => {
  const renderStars = (count) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<FaStar key={i} className={i < count ? "star-filled" : "star-empty"} />)
    }
    return stars
  }

  return (
    <Card className="city-card">
      <div className="image-wrapper">
        <Card.Img src={image} alt={name} width={180} height={150} className="card-image" />
      </div>
      <Card.Body className="card-body">
        <Card.Title className="card-title">{name}</Card.Title>
        <div className="card-details-grid">
          <div className="reviews-row">
            <span className="reviews-text">   </span>
            <span className="reviews-text">Preis</span>
          </div>
          <div className="reviews-row">
            <span className="reviews-text">{reviews} Reviews</span>
            {oldPrice && <span className="old-price">{oldPrice} EUR</span>}
          </div>
          <div className="price-row">
            <div className="star-rating">{renderStars(rating)}</div>
            <span className="new-price">{newPrice} EUR</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CityCard;
