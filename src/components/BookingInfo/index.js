import React from 'react';
import { IoCalendarOutline, IoCashOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Container } from 'react-bootstrap';

const BookingInfo = () => {
  return (
    <div className="booking-info-section">
      <Container>
        <div className="booking-info-content">
          <p className="intro-text">
            Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen.
          </p>
          
          <h2 className="section-title">Über diese</h2>
          
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon">
                <IoCalendarOutline size={24} />
              </div>
              <div className="info-content">
                <p className="info-text">
                  <strong>Jetzt reservieren, später zahlen:</strong> Bleiben Sie flexibel – buchen Sie jetzt und zahlen Sie später.
                </p>
                <p className="info-subtext">Dauer: 16 Stunden</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <IoCashOutline size={24} />
              </div>
              <div className="info-content">
                <p className="info-text">
                  Die Zahlung erfolgt vor Ort in bar in Euro, US-Dollar, Schweizer Franken oder Ägyptischen Pfund oder PayPal.
                </p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <IoCheckmarkCircleOutline size={24} />
              </div>
              <div className="info-content">
                <p className="info-text">
                  Die Bezahlung erfolgt bei der Abholung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingInfo;