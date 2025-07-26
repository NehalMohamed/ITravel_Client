import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSlider = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      image: "/images/slider/slide8.jpg",
      title: "Orange Bay Insel",
      subtitle: "Hurghada Schnorchel-Tour"
    },
    {
      id: 2,
      image: "/images/slider/slide3.jpg",
      title: "Privater Ausflug",
      subtitle: "nach Luxor & Tal der Könige"
    },
    {
      id: 3,
      image: "/images/slider/slide6.jpg",
      title: "Delfinschwimmen",
      subtitle: "und Schnorcheln"
    },
    {
      id: 4,
      image: "/images/slider/slide7.jpg",
      title: "Privater Ausflug",
      subtitle: "nach  Kairo von Hurghada "
    },
    {
      id: 5,
      image: "/images/slider/slide2.jpg",
      title: "Super Safari",
      subtitle: "Quad& Spider Fahrt+JeepTour"
    },
    {
      id: 6,
      image: "/images/slider/slide5.jpg",
      title: "Sindbad U-Boot",
      subtitle: "submarine in Hurghada"
    },
    {
      id: 7,
      image: "/images/slider/slide1.jpg",
      title: "El Gouna",
      subtitle: "Stadtrundfahrt ( privat )"
    }
  ]


  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // for (5 seconds)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000) // Resume auto-play after 5 seconds
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <Container>
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <h2 className="slide-subtitle">{slide.subtitle}</h2>
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

      {/* //Progress Bar
      <div className="slider-progress">
        <div
          className="progress-bar"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div> */}
    </section>
  )
}

export default HeroSlider;
