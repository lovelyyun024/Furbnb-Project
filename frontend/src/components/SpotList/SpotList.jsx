import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import "./SpotList.css";

export default function SpotList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchSpots());
  }, [dispatch]);

  const spotsData = useSelector((state) => state.spots);
  const list = Object.values(spotsData)

  return (
    <>
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
                <img src={previewImage} alt="Airbnb Image" />
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
            </div>
          ))}
      </section>
    </>
  );
}
