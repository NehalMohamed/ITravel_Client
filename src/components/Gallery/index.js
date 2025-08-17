import React, { useState } from 'react';
import { IoHeart, IoHeartOutline, IoShareSocial } from 'react-icons/io5';
import { CiExport } from "react-icons/ci";
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Lightbox from 'react-image-lightbox';
import { useTranslation } from "react-i18next";
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { t } = useTranslation();

  const images = [
    {
      id: 1,
      src: '/images/trip/egypt1.png',
      alt: 'Ancient Egyptian temple interior with guide'
    },
    {
      id: 2,
      src: '/images/trip/egypt2.png',
      alt: 'Hatshepsut Temple illuminated at night'
    },
    {
      id: 3,
      src: '/images/trip/egypt3.png',
      alt: 'Nile River cruise boats'
    },
    {
      id: 4,
      src: '/images/trip/egypt4.png',
      alt: 'Hot air balloon over Luxor'
    },
    {
      id: 5,
      src: '/images/trip/egypt5.png',
      alt: 'Temple columns and ancient architecture'
    }
  ];

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="gallery-section">
      <Container>
        {/* Header */}
        <div className="gallery-header">
          <h1 className="gallery-title">Tagesausflug nach luxor ( privat )</h1>
          <div className="gallery-meta">
            <div className="rating-section">
              <div className="stars">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
              </div>
              <span className="rating-text">4.0</span>
              <a href="#reviews" className="reviews-link">68,650 {t("tripDetails.reviews")}</a>
            </div>
            <div className="actions">
              <button 
                className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={toggleWishlist}
              >
                {isWishlisted ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
                <span className="btn-text">{t("tripDetails.addToWishlist")}</span>
              </button>
              <button className="action-btn share-btn">
                <CiExport size={24} />
                <span className="btn-text">{t("tripDetails.share")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          <div className="main-image">
            <img 
              src={images[0].src} 
              alt={images[0].alt}
              onClick={() => openLightbox(0)}
            />
          </div>
          <div className="secondary-image">
            <img 
              src={images[1].src} 
              alt={images[1].alt}
              onClick={() => openLightbox(1)}
            />
          </div>
          <div className="thumbnail-grid">
            {images.slice(2, 5).map((image, index) => (
              <div key={image.id} className="thumbnail">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onClick={() => openLightbox(index + 2)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* React Image Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
            imageTitle={images[photoIndex].alt}
            imageCaption={`${photoIndex + 1} / ${images.length}`}
            reactModalStyle={{
              overlay: {
                zIndex: 9999
              }
            }}
            // toolbarButtons={[
            //   <button
            //     key="wishlist"
            //     type="button"
            //     className="ril-toolbar__item__child lightbox-wishlist"
            //     onClick={toggleWishlist}
            //     title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            //   >
            //     {isWishlisted ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
            //   </button>
            // ]}
          />
        )}
      </Container>
    </div>
  );
};

export default Gallery;