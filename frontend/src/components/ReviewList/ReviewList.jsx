import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviews } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import CreateReviewButton from "./CreateReviewButton";
import "./ReviewList.css";

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviewsData = useSelector((state) => state.reviews);
  const spotsData = useSelector((state) => state.spots.spot);

  const reviewList = Object.values(reviewsData);

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  const currentUser = useSelector((state) => state.session.user);
  const [showReviewButton, setShowReviewButton] = useState(false);

  useEffect(() => {
    if (spotsData && currentUser && spotsData.ownerId !== currentUser.id) {
      const userHasReviewed = reviewList.find(
        (review) => review.userId == currentUser.id
      );
      if (!userHasReviewed) {
        setShowReviewButton(true);
      }
    }
  }, [currentUser, reviewList, spotsData]);

  if (!reviewList) return null;
  if (!spotsData) return null;

  const verb = spotsData.numReviews === 1 ? "review":"reviews"

  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb} `;

return (
  <>
    <h2>
      {spotsData.avgRating} {reviews}
    </h2>
    <CreateReviewButton show={showReviewButton} id={spotId} />
    {[...reviewList].reverse().map(({ id, review, User, createdAt }) => (
      <div key={id} className="review">
        <h3> {(User ? User : currentUser).firstName}</h3>
        <h5> {createdAt.slice(0, 10)} </h5>
        <p> {review}</p>
      </div>
    ))}
  </>
);
}
