import React, { useEffect } from 'react';
import Gallery from "../components/Gallery";
import BookingInfo from "../components/BookingInfo";
import FlightItinerary from "../components/FlightItinerary";
import Reviews from "../components/Reviews";
import TourDetails from "../components/TourDetails";
import CityCarousel from "../components/CityCarousel";

const TripDetailsPage = () => {
  return (
   <>
      <Gallery />
      <BookingInfo />
      <FlightItinerary />
      <Reviews />
      <TourDetails />
      <CityCarousel />
   </>
  );
};

export default TripDetailsPage;
