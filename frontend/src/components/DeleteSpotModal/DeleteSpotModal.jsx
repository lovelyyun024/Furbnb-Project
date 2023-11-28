import * as spotActions from "../../store/spots";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

export default function DeleteSpotModal({ spotId }) {
  const id = spotId;
//   console.log("label",id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    dispatch(spotActions.removeSpot(id));

    closeModal();
  };

   const handleSubmitKeep = (e) => {
     e.preventDefault();
     closeModal();
   };
  return (
    <div >
      <h1> Confirm Delete </h1>
      <p>Are you sure you want to remove this spot from the listings?</p>

      <form onSubmit={handleSubmitDelete}>
        <button
          type="submit"
          style={{
            backgroundColor: "red",
            width: "50%",
            height: "30px",
            borderRadius: "5px",
            cursor:"pointer"
          }}
        >
          Yes (Delete Spot)
        </button>
      </form>

      <form onSubmit={handleSubmitKeep}>
        <button
          type="submit"
          style={{ width: "50%", height: "30px", borderRadius: "5px",  cursor:"pointer" }}
        >
          No (Keep Spot)
        </button>
      </form>
    </div>
  );
}
