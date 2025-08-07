import { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import CityCard from "../CityCard";

const CityCarousel = () => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // Adjust as needed
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

   const cities = [
    {
      id: 1,
      image: "/images/Cities/soma bay.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 5,
      oldPrice: 45,
      newPrice: 45,
    },
    {
      id: 2,
      image: "/images/Cities/hurghada-2.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 5,
      oldPrice: 45,
      newPrice: 45,
    },
    {
      id: 3,
      image: "/images/Cities/el guna.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 4,
      oldPrice: 45,
      newPrice: 30,
    },
    {
      id: 4,
      image: "/images/Cities/marsa alam.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 4,
      oldPrice: 45,
      newPrice: 30,
    },
    {
      id: 5,
      image: "/images/Cities/sahl-hasheesh.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 5,
      oldPrice: 45,
      newPrice: 50,
    },
     {
      id: 6,
      image: "/images/Cities/makadi bay.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 4,
      oldPrice: 45,
      newPrice: 30,
    },
    {
      id: 7,
      image: "/images/Cities/sahl-hasheesh.jpg",
      name: "Sahl Hashesh",
      reviews: 100,
      rating: 5,
      oldPrice: 45,
      newPrice: 50,
    },
  ]

  return (
    <section className="carousel-section" id="cities">
    <Container>
        <div className="section-header">
            <h2 className="section-title">{t('wishlist.topCities')}</h2>
            <p className="section-subtitle">
               {t('wishlist.topCitiesDescription')}
            </p>
        </div>
      
      <div className="carousel-wrapper">
        <Button
          variant="light"
          className="nav-button nav-button-left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </Button>
        <div className="cards-container" ref={scrollContainerRef}>
          <Row className="flex-nowrap g-3">
            {cities.map((city) => (
              <Col key={city.id} xs={12} sm={6} md={4} lg={3} className="card-col">
                <CityCard {...city} />
              </Col>
            ))}
          </Row>
        </div>
        <Button
          variant="light"
          className="nav-button nav-button-right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </Button>
      </div>
    </Container>
    </section>
  );
};


export default CityCarousel;