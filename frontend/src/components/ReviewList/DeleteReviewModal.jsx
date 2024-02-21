import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchSingleSpot } from "../../store/singleSpot";

export default function DeleteReviewModal({ review, spot }) {
  const reviewId = review;
  const spotId = spot;

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(reviewActions.thunkDeleteReview(reviewId)).then(() => {
      dispatch(thunkFetchSingleSpot(spotId));
      closeModal()
    }).catch((error) => {
      console.error("Error deleting review:", error);
    });

  };

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmitDelete} className="modal-form-container">
        <h1> Confirm Delete </h1>
        <p>Are you sure you want to delete this review?</p>
        <button className="form-continue" type="submit">
          Yes (Delete Review)
        </button>
        <button className="form-reject" onClick={closeModal}>
          No (Keep Review)
        </button>
      </form>
    </div>
  );
}
