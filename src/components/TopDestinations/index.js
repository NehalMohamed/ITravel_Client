import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TopDestinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const destinations = [
    {
      id: 1,
      name: 'Hurghada',
      image: '/images/Cities/hurghada-2.jpg',
      alt: 'Hurghada Resort Pool',
      route: 'hurghada'
    },
    {
      id: 2,
      name: 'Makadi Bay',
      image: '/images/Cities/makadi bay.jpg',
      alt: 'Makadi Bay Beach View',
      route: 'makadi-bay'
    },
    {
      id: 3,
      name: 'El Gouna',
      image: '/images/Cities/el guna.jpg',
      alt: 'El Gouna Marina',
      route: 'el-gouna'
    },
    {
      id: 4,
      name: 'Soma Bay',
      image: '/images/Cities/soma bay.jpg',
      alt: 'Soma Bay Sunset',
      route: 'soma-bay'
    },
    {
      id: 5,
      name: 'Sahl Hashesh',
      image: '/images/Cities/sahl-hasheesh.jpg',
      alt: 'Sahl Hashesh Resort',
      route: 'sahl-hashesh'
    },
    {
      id: 6,
      name: 'El Quseir',
      image: '/images/Cities/el quseir.jpg',
      alt: 'El Quseir Harbor',
      route: 'el-quseir'
    },
    {
      id: 7,
      name: 'Marsa Alam',
      image: '/images/Cities/marsa alam.jpg',
      alt: 'Marsa Alam Underwater',
      route: 'marsa-alam'
    },
    {
      id: 8,
      name: 'Ägypten Rundreisen',
      image: '/images/Cities/Egyptian Pyramids.jpeg',
      alt: 'Egyptian Pyramids',
      route: 'egypt-roundtrips'
    }
  ];

  useEffect(() => {
    // Simulate loading time for smooth animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDestinationClick = (destination) => {
    navigate(`/excursions/${destination.route}`);
  };

  const handleImageError = (destinationId) => {
    setImageErrors(prev => ({
      ...prev,
      [destinationId]: true
    }));
  };

  const renderDestinationCard = (destination, index) => (
    <Col 
      key={destination.id} 
      xs={12} 
      sm={6} 
      md={4} 
      lg={3} 
      className={`destination-col ${index >= 4 ? 'second-row' : 'first-row'}`}
    >
      <Card 
        className="destination-card"
        onClick={() => handleDestinationClick(destination)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDestinationClick(destination);
          }
        }}
      >
        <div className="card-image-wrapper">
          {imageErrors[destination.id] ? (
            <div 
              className="destination-fallback"
            >
              <span className="destination-icon">📍</span>
            </div>
          ) : (
            <Card.Img 
              variant="top" 
              src={destination.image} 
              alt={destination.alt}
              className="destination-image"
              onError={() => handleImageError(destination.id)}
              loading="lazy"
            />
          )}
          <div className="card-overlay">
            <Card.Title className="destination-name">
              {destination.name}
            </Card.Title>
          </div>
        </div>
      </Card>
    </Col>
  );

  if (loading) {
    return (
      <section className="top-destinations">
        <Container>
          <div className="section-header">
            <h2 className="section-title">
              {t('wishlist.topCities')}
            </h2>
            <p className="section-subtitle">
              {t('wishlist.topCitiesDescription')}
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
          <h2 className="section-title">
            {t('wishlist.topCities')}
          </h2>
          <p className="section-subtitle">
            {t('wishlist.topCitiesDescription')}
          </p>
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