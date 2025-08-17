import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

const Reviews = () => {
  const { t } = useTranslation();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const reviews = [
    {
      id: 1,
      name: "Elida - United States",
      date: "Jul 24, 2021 - verified booking",
      rating: 4.0,
      text: "Our tour guide was very knowledgeable and patient with my 7 year old questions"
    },
    {
      id: 2,
      name: "Elida - United States",
      date: "Jul 24, 2021 - verified booking", 
      rating: 4.0,
      text: "Our tour guide was very knowledgeable and patient with my 7 year old questions"
    }
  ];

  const handleAddReviewClick = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleSubmitReview = () => {
    // Handle review submission here
    console.log('Rating:', userRating, 'Review:', reviewText);
    setShowReviewForm(false);
    setUserRating(0);
    setReviewText('');
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-section">
      <Container>
        <div className="row">
          <div className="col-lg-10">
            <div className="reviews-container">
              <h3 className="section-title">{t("tripDetails.reviewsFromTravelers")}</h3>
              
              <div className="row">
                {reviews.map((review) => (
                  <div className="col-md-6 mb-3" key={review.id}>
                    <div className="card review-card h-100">
                      <div className="card-body">
                        <div className="review-header mb-3">
                          <div className="d-flex align-items-center mb-2">
                            {renderStars(review.rating)}
                            <span className="rating-number ms-2">{review.rating}</span>
                          </div>
                          <div className="reviewer-info">
                            <div className="reviewer-avatar">
                              <span>{review.name.charAt(0)}</span>
                            </div>
                            <div className="reviewer-details">
                              <div className="reviewer-name">{review.name}</div>
                              <div className="review-date">{review.date}</div>
                            </div>
                          </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reviews-actions mt-4">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <button 
                      className="btn btn-link add-reviews-btn p-0"
                      onClick={handleAddReviewClick}
                    >
                      {t("tripDetails.addReviews")}
                    </button>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <button className="btn btn-link see-more-btn p-0">
                       {t("tripDetails.seeMoreReviews")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Review Form - Hidden by default */}
              {showReviewForm && (
                    <div className="review-form mt-4">
                      
                      <div className="rating-section mb-3">
                        <p className="rating-text"> {t("tripDetails.rateTour")}</p> 
                        {renderStars(userRating, true)}
                      </div>
                      
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder= {t("tripDetails.writeReview")}
                        />
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          className="btn secondryBtn me-2"
                          onClick={handleSubmitReview}
                        //   disabled={userRating === 0 || reviewText.trim() === ''}
                          disabled={reviewText.trim() === ''}
                        >
                           {t("tripDetails.add")}
                        </button>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => setShowReviewForm(false)}
                        >
                         {t("tripDetails.cancel")}
                        </button>
                      </div>
                    </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;