import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TripContext } from '../contexts/TripContext';
import Gallery from "../components/Gallery";
import BookingInfo from "../components/BookingInfo";
import FlightItinerary from "../components/FlightItinerary";
import Reviews from "../components/Reviews";
import TourDetails from "../components/TourDetails";
import CityCarousel from "../components/CityCarousel";

const TripDetailsPage = () => {
  const { state } = useLocation(); // Get tripData passed from navigation
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (state?.tripData) {
      setTripData(state.tripData);
    } else {
      // Fallback to localStorage if state is lost
      const savedTripData = localStorage.getItem('currentTripData');
      if (savedTripData) {
        setTripData(JSON.parse(savedTripData));
      }
    }
  }, [state]);

  // Clean up localStorage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('currentTripData');
    };
  }, []);

  return (
   <TripContext.Provider value={tripData}>
      <Gallery tripData={tripData} />
      <BookingInfo tripData={tripData}/>
      <FlightItinerary tripData={tripData}/>
      <Reviews tripData={tripData}/>
      <TourDetails tripData={tripData}/>
      <CityCarousel />
   </TripContext.Provider>
  );
};

export default TripDetailsPage;