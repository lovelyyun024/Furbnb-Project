import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviews } from "../../store/reviews";
import { thunkFetchSingleSpot } from "../../store/singleSpot";
import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal.jsx";
import "./ReviewList.css";

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviewList = useSelector((state) => state.reviews.reviews);
  const spotsData = useSelector((state) => state.singleSpot);
  // console.log("here", reviewList);
  // console.log("here", spotsData.ownerId);

  useEffect(() => {
    dispatch(getReviews(spotId));
    dispatch(thunkFetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  const currentUser = useSelector((state) => state.session.user);
  // console.log(currentUser.id)

  const [showReviewButton, setShowReviewButton] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const sameUser = spotsData.ownerId === currentUser.id;
      const userHasReviewed = reviewList.find(
        (review) => review.userId == currentUser.id
      );
      setShowReviewButton(!userHasReviewed && !sameUser);
    }
  }, [currentUser, reviewList, spotsData]);

  if (!reviewList) return null;
  if (!spotsData) return null;
  // if(!currentUser) return null

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

      {[...reviewList]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(({ id, userId, review, User, createdAt }) => (
          <div key={id} className="review-list-container">
            {/* {currentUser.id === userId && setShowMenu(true)} */}
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
