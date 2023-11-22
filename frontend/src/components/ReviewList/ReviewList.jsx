import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getReviews } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import "./ReviewList.css";

export default function ReviewList() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

 const reviewsData = useSelector((state) => state.reviews);
  const spotsData = useSelector((state) => state.spots.spot);

const reviewList = Object.values(reviewsData);
// console.log("review1", reviewsData);
//  console.log("review2",reviewList)
// console.log("label", spotsData)
// console.log("label", spotsData);

   useEffect(() => {
     dispatch(getReviews(spotId));
   }, [dispatch, spotId]);

      useEffect(() => {
        dispatch(getOneSpot(spotId));
      }, [dispatch, spotId]);

   if(!reviewList) return null
    if (!spotsData) return null;

  return (
    <>
      <h2>
        {spotsData.avgRating} · {spotsData.numReviews} reviews
      </h2>

      {reviewList?.map(({ id, review, User, createdAt }) => (
        <div key={id} className="review">
          <h3 > {User.firstName}</h3>
          <h5 > {createdAt.slice(0, 10)} </h5>
          <p > {review}</p>
        </div>
      ))}
    </>
  );
}
