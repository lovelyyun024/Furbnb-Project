import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getOwnerSpot } from "../../store/spots";
import { thunkFetchUserSpots } from "../../store/userSpots";
import DeleteSpotButton from "../DeleteSpotModal/DeleteSpotModal";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

export default function ManageSpot() {
  const dispatch = useDispatch();
  const spotsData = useSelector((state) => state.userSpots);
  const list = Object.values(spotsData);
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(thunkFetchUserSpots());
  }, [dispatch]);

  return (
    <>
      <h1>Manage Your Spots</h1>
      <section className="main-container">
        {[...list]
          .reverse()
          .map(({ id, city, state, previewImage, avgRating, price }) => (
            <div key={id} className="info-container">
              <NavLink
                exact
                to={`/spots/${id}`}
                style={{ textDecoration: "none", color: "#222222" }}
              >
                <img className="info-img" src={previewImage} alt="Airbnb Image" />
                <div className="info-line1">
                  <div className="info-address">
                    {city}, {state}
                  </div>
                  <div className="info-review">{avgRating}</div>
                </div>
                <div className="info-price-container">
                  <span className="info-price">
                    ${price}
                  </span>
                  night
                </div>
              </NavLink>
              <div className="button-container">
                  <NavLink
                    exact
                    to={`/spots/${id}/edit`}
                    className="nav-button"
                  >
                <button type="button">
                    Update
                </button>
                  </NavLink>

                <OpenModalButton
                  buttonText={
                    <div className="dropdown-menu-option">Delete</div>
                  }
                  onItemClick={closeMenu}
                  modalComponent={<DeleteSpotButton spotId={id} />}
                />
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
