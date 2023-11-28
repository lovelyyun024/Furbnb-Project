import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useParams } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import "./ReviewFormModal.css";

function ReviewFormModal({ id, onReviewSubmitted }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const starArray = [1, 2, 3, 4, 5];
  const spotId = id;
  let disableButton = "";

  const handleRatingChange = (star) => {
    setStars(star);
  };

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
    <>
      <form onSubmit={handleSubmit}>
        <h1> How was your stay?</h1>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          style={{ height: "80px", width: "300px", margin: "10px" }}
          placeholder="Leave your review here..."
        />

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
          <p></p>
        </div>
        {errors.review && <p>{errors.review}</p>}
        {errors.stars && <p>{errors.stars}</p>}
        <div id="review-submit-container">
          <button type="submit" disabled={disableButton}>
            Submit Your Review
          </button>
        </div>
      </form>
    </>
  );
}

export default ReviewFormModal;
