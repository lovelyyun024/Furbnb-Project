import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerSpot } from "../../store/spots";
import { NavLink } from "react-router-dom";
import "./ManageSpot.css";

export default function ManageSpot() {
  const dispatch = useDispatch();

  const spotsData = useSelector((state) => state.spots);
  const spotList = Object.values(spotsData);

  useEffect(() => {
    dispatch(getOwnerSpot());
  }, [dispatch]);

  if (!spotList) return null;

  return (
    <>
      <h1>Manage Your Spots</h1>
      {[...spotList]
        .reverse()
        .map(({ id, city, state, previewImage, avgRating, price }) => (
          <div key={id} className="spot">
            {/* <NavLink
              exact
              to={`/spots/${id}`}
              style={{ textDecoration: "none" }}
            > */}
            <img src={previewImage} alt="Airbnb Image" />
            <div className="star">
              <p>
                {city}, {state}
              </p>
              <p>{avgRating}</p>
            </div>
            <p>${price} night</p>
            <button type="button">Update</button>
            <button type="button">Delete</button>
            {/* </NavLink> */}
          </div>
        ))}
    </>
  );
}
