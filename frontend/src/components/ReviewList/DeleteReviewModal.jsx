import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function DeleteReviewModal({ review, spot }) {
  const reviewId = review;
    const spotId  = spot;
    // console.log(spotId)

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(reviewActions.removeReview(reviewId, spotId));

    closeModal();
  };

  const handleSubmitKeep = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <>
      <h1> Confirm Delete </h1>
      <p>Are you sure you want to delete this review?</p>
      <form onSubmit={handleSubmitDelete}>
        <button type="submit">Yes (Delete Review)</button>
      </form>
      <form onSubmit={handleSubmitKeep}>
        <button type="submit">No (Keep Review)</button>
      </form>
    </>
  );
}
