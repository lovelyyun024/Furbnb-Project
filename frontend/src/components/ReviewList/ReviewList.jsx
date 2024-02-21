import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkFetchReviews, resetReviews } from "../../store/reviews";
import { thunkFetchSingleSpot } from "../../store/singleSpot";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal.jsx";
import "./ReviewList.css";

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviewList = useSelector((state) => state.reviews);
  const reviewArray = Object.values(reviewList);
  const spotsData = useSelector((state) => state.singleSpot);

  useEffect(() => {
    dispatch(resetReviews())
    dispatch(thunkFetchReviews(spotId));
    dispatch(thunkFetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  const currentUser = useSelector((state) => state.session.user);
  const [showReviewButton, setShowReviewButton] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const sameUser = spotsData.ownerId === currentUser.id;
      const userHasReviewed = reviewArray.find(
        (review) => review.userId == currentUser.id
      );
      setShowReviewButton(!userHasReviewed && !sameUser);
    }
  }, [currentUser, reviewList, spotsData]);

  const verb = spotsData.numReviews === 1 ? "Review" : "Reviews";

  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb} `;

  return (
    <div className="review-container">
      <div className="submit-review-container">
        <h1>
          {spotsData.avgRating} {reviews}
        </h1>
        {showReviewButton && (
          <OpenModalButton
            buttonText="Post your review"
            modalComponent={<ReviewFormModal id={spotId} />}
          />
        )}
      </div>
      {reviewList.length == 0 && showReviewButton && (
        <div>
          <p>Be the first to post a review!</p>
        </div>
      )}

      {[...reviewArray]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(({ id, userId, review, User, createdAt }) => (
          <div key={id} className="review-list-container">
            <h2> {(User ? User : currentUser).firstName}</h2>
            <p style={{ color: "gray" }}> {createdAt.slice(0, 10)} </p>
            <p> {review}</p>
            {currentUser?.id === userId && (
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal review={id} spot={spotId} />}
              />
            )}
          </div>
        ))}
    </div>
  );
}
