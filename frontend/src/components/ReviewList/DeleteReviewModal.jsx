import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function DeleteReviewModal({ review, spot }) {
  const reviewId = review;
  const spotId = spot;

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(reviewActions.removeReview(reviewId, spotId));
    closeModal();
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
