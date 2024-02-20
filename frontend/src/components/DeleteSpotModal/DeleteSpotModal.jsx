import { thunkDeleteUserSpot } from "../../store/userSpots";
import { thunkDeleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function DeleteSpotModal({ spotId }) {
  const id = spotId;
  // const spots = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(thunkDeleteUserSpot(id));
    dispatch(thunkDeleteSpot(id));
    closeModal();
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmitDelete} className="modal-form-container">
        <h1> Confirm Delete </h1>
        <div>Are you sure you want to remove this spot from the listings?</div>
        <button className="form-continue" type="submit">Yes (Delete Spot)</button>
        <button className="form-reject"onClick={closeModal}>No (Keep Spot)</button>
      </form>
    </div>
  );
}
