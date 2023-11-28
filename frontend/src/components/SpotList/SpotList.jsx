import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './SpotList.css'


export default function SpotList() {
  const dispatch = useDispatch();

  const spotsData = useSelector((state) => state.spots);
  const spotList = Object.values(spotsData);


  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if(!spotList) return null
  
  return (
    <>
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
                  <p id="review" style={{fontWeight:"bold"}}>{avgRating}</p>
                <p>
                  <span id="bold" style={{fontSize:"18px"}}>${price} </span>night
                </p>
                </div>
              </NavLink>
            </div>
          ))}
      </section>
    </>
  );
}
