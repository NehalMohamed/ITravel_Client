import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { IoLocationOutline } from 'react-icons/io5';
import { useTranslation } from "react-i18next";

const FlightItinerary = () => {
    const { t } = useTranslation();

  const itinerarySteps = [
    {
      id: 1,
      title: "Ausgangspunkt",
      description: "Früh am Morgen Hotel"
    },
    {
      id: 2,
      title: "Qena",
      description: "Für eine Entfernung von etwa 220 Kilometern ins Niltal"
    },
    {
      id: 3,
      title: "Rastplatz",
      description: "Sie können das Badezimmer benutzen oder sich die Beine vertreten."
    },
    {
      id: 4,
      title: "Vor Luxor (ca.60 km)",
      description: "Sie werden durch viele kleine und große Städte fahren, authentischen ägyptischen Alltag erleben."
    },
    {
      id: 5,
      title: "Luxor",
      description: "Sie besuchen die größte Tempelanlage der Welt mit ihrer riesigen Kolonnenhalle"
    },
    {
      id: 6,
      title: "Westliche Güte",
      description: "Traditionelles lokales Mittagessen, das weltberühmte Tal der Könige, die prächtigen Königsgräber, der Tempel der Königin Hatschepsut auf der Terrasse"
    },
    {
      id: 7,
      title: "Rückweg",
      description: "Um sich an die Eindrücke des Tages zu erinnern oder das Teilnehm am Ufer des Nils zu beobachten"
    },
    {
      id: 8,
      title: "Hotel",
      description: "Voraussichtlich um acht Uhr abends im Hotel ankommen"
    }
  ];

  return (
    <div className="flight-itinerary-section">
      <Container>
        <Row>
          <Col lg={8} md={10}>
            <Card className="itinerary-card">
              <Card.Body >
                <h2 className="section-title mb-4">{t("tripDetails.itinerary")}</h2>
                
                <div className="timeline-container">
                  {itinerarySteps.map((step, index) => (
                    <div key={step.id} className="timeline-step">
                      <div className="timeline-marker-wrapper">
                        <div className="timeline-marker">
                          <IoLocationOutline size={16} />
                        </div>
                        {index < itinerarySteps.length - 1 && (
                          <div className="timeline-connector"></div>
                        )}
                      </div>
                      
                      <div className="timeline-content">
                        <h5 className="step-title mb-1">{step.title}</h5>
                        <p className="step-description mb-0">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FlightItinerary;