import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useParams } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import "./ReviewFormModal.css";

function ReviewFormModal({ id }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const starArray = [1, 2, 3, 4, 5];
  const spotId = id;
  let disableButton = "";
  const [setIsReviewSubmitted] = useState(false);

  const handleRatingChange = (star) => {
    setStars(star);
  };

  const onReviewSubmitted = () => setIsReviewSubmitted(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      review,
      stars,
    };

    dispatch(reviewsActions.createReview(reviewData, spotId))
      .then(() => {
        onReviewSubmitted();
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    dispatch(spotActions.getOneSpot(spotId));
  };

  if (review.length < 10 || stars < 1) disableButton = "disabled";

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmit} className="modal-form-container">
        <h1> How was your stay?</h1>
        <textarea
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          placeholder="Leave your review here..."
        />
        {errors.review && <p>{errors.review}</p>}
        <div id="star-container" style={{ fontSize: "18px" }}>
          {starArray.map((star) => (
            <span
              key={star}
              onClick={() => handleRatingChange(star)}
              style={{
                cursor: "pointer",
                color: star <= stars ? "gold" : "darkgray",
              }}
            >
              ★
            </span>
          ))}
          <span> &nbsp;Stars</span>
          {errors.stars && <p>{errors.stars}</p>}
        </div>
        <button type="submit" className="submit-review-button" disabled={disableButton}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
