import * as reviewActions from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteReviewModal.css";

export default function DeleteReviewModal({ review, spot }) {
  const reviewId = review;
  const spotId = spot;
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
    <div style={{ width: "50%" }}>
      <form onSubmit={handleSubmitDelete}>
        <h1> Confirm Delete </h1>
        <p>Are you sure you want to delete this review?</p>
        <button
          type="submit"
          style={{
            backgroundColor: "red",
            // width: "80%",
            height: "30px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Yes (Delete Review)
        </button>
      </form>
      <form onSubmit={handleSubmitKeep}>
        <button
          type="submit"
          style={{
            // width: "100%",
            height: "30px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor:"darkgray"
          }}
        >
          No (Keep Review)
        </button>
      </form>
    </div>
  );
}
