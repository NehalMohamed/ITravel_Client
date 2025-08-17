import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchTripsAll, selectSliderTrips } from '../../redux/Slices/tripsSlice';

const HeroSlider = () => {
  const { t } = useTranslation();   
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const currentLang = useSelector((state) => state.language.currentLang) || "en";
  const slides = useSelector(selectSliderTrips);
  const loading = useSelector((s) => s.trips.loading);
  const error = useSelector((s) => s.trips.error);

  useEffect(() => {
    dispatch(fetchTripsAll(currentLang));
  }, [dispatch, currentLang]);
  
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (slides.length === 0) return <div>No slides available</div>;

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.trip_id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.default_img})` }}
          >
            <div className="slide-overlay"></div>
            <Container>
              <div className="slide-content">
                <h1 className="slide-title">{slide.trip_name}</h1>
                <h2 className="slide-subtitle">{slide.trip_description}</h2>
                <div className="slide-actions">
                  <button className="btn-primary">{t('general.more')}</button>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="slider-nav prev" onClick={goToPrevious} aria-label="Previous slide">
        <FaChevronLeft />
      </button>
      <button className="slider-nav next" onClick={goToNext} aria-label="Next slide">
        <FaChevronRight />
      </button>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="slider-progress">
        <div
          className="progress-bar"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;