import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const TourDetails = () => {
  const tourInfo = {
    highlights: [
      "Wir bieten keine Verkaufsveranstaltungen an.",
      "Besuchen Sie den Karnak-Tempel.",
      "Erkunden Sie das Tal der Könige und seine faszinierenden Gräber.",
      "Tauchen Sie ein in die Geschichte Ägyptens.",
      "Genießen Sie die atemberaubende Bootsfahrt auf dem Nil.",
      "Besuchen Sie das beeindruckende Kolosseum von Memnon.",
      "Genießen Sie das Spektakel eines Nilotischen Wasserfalls bei Abholung und Besichtigungen.",
      "Deutschsprachige Reiseleitung (Ägyptologe).",
      "Mittagessen mit ägyptischen Spezialitäten.",
      "Getränke im Bus."
    ],
    included: [
      "Alle Transfers mit hochwertigen Markenfahrzeugen und mit professionellen Fahrern.",
      "Eintrittsgelder für die gesamten Sehenswürdigkeiten: Karnak-Tempel, Tal der Könige, Tempel der Hatschepsut und Memnon-Kolosse.",
      "Deutschsprachige Reiseleitung (Ägyptologe).",
      "Mittagessen mit ägyptischen Spezialitäten.",
      "Getränke im Bus."
    ],
    notIncluded: [
      "Jegliche Zusätze, die nicht im Ablauf erwähnt werden.",
      "Getränke im Restaurant.",
      "Persönliche Ausgaben."
    ],
    importantNotes: [
      "Bringen Sie einen Wecker mit oder bestellen Sie diesen an der Rezeption.",
      "Denken Sie an Ihr Frühstückspaket und holen Sie es am Tag der Abfahrt an der Rezeption ab.",
      "Vergessen Sie Ihre Fotoausrüstung und Ihre Videokamera nicht.",
      "Bequeme Schuhe und Kopfbedeckung (Kappe, Mütze).",
      "Vergessen Sie nicht Ihre Sonnenbrille und Sonnenschutzcreme.",
      "Bringen Sie die Hotel- und Zimmernummer auf WhatsApp oder SMS mit, damit wir Sie kontaktieren können."
    ],
    additionalInfo: [
      "Tour-Kategorie: Privat geführte Tour",
      "Abholung: Um 05:00 Uhr",
      "Ankunft in Luxor: Gegen 09:00 Uhr",
      "Rückkehr: Gegen 20:00 Uhr",
      "Treff- und Endpunkt: Ihr Hotel"
    ]
  };

  const renderSection = (title, items) => (
    <div className="detail-section">
      <Row>
        <Col md={3} className="section-title">
          <span>{title}</span>
        </Col>
        <Col md={9}>
          <ul className="detail-list">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <hr />
    </div>
  );

  return (
    <section className="tour-details-section">
    <Container>
      <hr />
      {renderSection("Highlights", tourInfo.highlights)}
      {renderSection("Inbegriffen", tourInfo.included)}
      {renderSection("Nicht inbegriffen", tourInfo.notIncluded)}
      {renderSection("Bitte nicht vergessen", tourInfo.importantNotes)}
      {renderSection("Zusätzliche Informationen", tourInfo.additionalInfo)}

      {/* Pricing */}
      <div className="pricing-section text-center mt-4">
        <h2 className="price-title">Preis Ab 100 € P.p</h2>
        <Button variant="success" size="lg" className="mt-2">
          Jetzt buchen
        </Button>
      </div>
    </Container>
    </section>
  );
};

export default TourDetails;
