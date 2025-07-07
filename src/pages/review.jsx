import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Review.css';

function Review() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating before submitting your review.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log('Review submitted:', { rating, comment });
      
      // Navigate back to home page
      navigate('/');
    }, 1000);
  };

  const getStarClass = (starIndex) => {
    const displayRating = hoveredRating || rating;
    return displayRating >= starIndex ? 'star filled' : 'star';
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <div className="review-header">
          <h2>How was your experience?</h2>
          <p>We'd love to hear about your shopping experience with Atlas Electronics!</p>
        </div>

        <form onSubmit={handleSubmitReview} className="review-form">
          {/* Rating Section */}
          <div className="rating-section">
            <h3>Rate your experience</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  className={getStarClass(starIndex)}
                  onClick={() => handleStarClick(starIndex)}
                  onMouseEnter={() => handleStarHover(starIndex)}
                  onMouseLeave={handleStarLeave}
                  aria-label={`Rate ${starIndex} stars`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="rating-text">
              {rating > 0 && (
                <span className="rating-label">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <h3>Tell us more (optional)</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about our products, service, or anything else you'd like us to know..."
              className="review-textarea"
              rows="6"
              maxLength="500"
            />
            <div className="character-count">
              {comment.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button
              type="submit"
              className="submit-review-btn"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
            </button>
            
            <button
              type="button"
              className="skip-review-btn"
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Skip Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Review;
