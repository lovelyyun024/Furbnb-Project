import { deleteUserSpots } from "../../store/userSpots";
import { thunkDeleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function DeleteSpotModal({ spotId }) {
  const id = spotId;
  // const spots = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = async(e) => {
    e.preventDefault();
    const res = await dispatch(thunkDeleteSpot(id));
    const data = await res.json();
       if (res.ok) {
         await dispatch(deleteUserSpots(id));
         closeModal();
       } else {
         console.log(data);
       }
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
