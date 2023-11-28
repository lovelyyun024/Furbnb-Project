import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviews } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import CreateReviewButton from "./CreateReviewButton";
import DeleteReviewButton from "./DeleteReviewButton";
import "./ReviewList.css";

export default function ReviewList() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviewList = useSelector((state) => state.reviews.reviews);
  const spotsData = useSelector((state) => state.spots);
  // console.log("here", reviewList);
  // console.log("here", spotsData.ownerId);

  useEffect(() => {
    dispatch(getReviews(spotId));
    dispatch(getOneSpot(spotId));
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

  const verb = spotsData.numReviews === 1 ? "review" : "reviews";

  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb} `;

  return (
    <>
      <div>
        <h1>
          {spotsData.avgRating} {reviews}
        </h1>
        <CreateReviewButton show={showReviewButton} id={spotId} />
      </div>

      {[...reviewList]
        .reverse()
        .map(({ id, userId, review, User, createdAt }) => (
          <div key={id} className="review">
            {/* {currentUser.id === userId && setShowMenu(true)} */}
            <h2> {(User ? User : currentUser).firstName}</h2>
            <p style={{ color: "gray" }}> {createdAt.slice(0, 10)} </p>
            <p> {review}</p>
            {currentUser?.id === userId && (
              <DeleteReviewButton review={id} spot={spotId} />
            )}
          </div>
        ))}
    </>
  );
}
