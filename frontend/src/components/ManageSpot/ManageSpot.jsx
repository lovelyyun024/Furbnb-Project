import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getOwnerSpot } from "../../store/spots";
import * as spotActions from "../../store/spots";
import DeleteSpotButton from "./DeleteSpotButton";
import { NavLink } from "react-router-dom";
import "./ManageSpot.css";

export default function ManageSpot() {
  const dispatch = useDispatch();

  const spotsData = useSelector((state) => state.spots);
  const spotList = Object.values(spotsData);
 

  useEffect(() => {
    dispatch(spotActions.getOwnerSpot());
  }, [dispatch]);

  if (!spotList) return null;

  return (
    <>
      <h1>Manage Your Spots</h1>
      <section id="main-container">
        {[...spotList]
          .reverse()
          .map(({ id, city, state, previewImage, avgRating, price }) => (
            <div key={id} className="spot">
              <NavLink
                exact
                to={`/spots/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img src={previewImage} alt="Airbnb Image" />
                <div className="star">
                  <p id="address">
                    {city}, {state}
                  </p>
                  <p id="review" style={{ fontWeight: "bold" }}>
                    {avgRating}
                  </p>
                  <p>
                    <span id="bold" style={{ fontSize:"18px" }}>${price} </span>night
                  </p>
                </div>
              </NavLink>
              <div id="button-container">
                <NavLink
                  exact
                  style={{ textDecoration: "none" }}
                  to={`/spots/${id}/edit`}
                >
                  <button type="button">Update</button>
                </NavLink>

                <DeleteSpotButton spotId={id} />
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
