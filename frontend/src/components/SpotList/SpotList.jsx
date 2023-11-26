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
      {[...spotList].reverse().map(({ id, city, state, previewImage, avgRating, price }) => (
        <div key={id} className="spot">
          <NavLink exact to={`/spots/${id}`} style={{ textDecoration: "none" }}>
            <img src={previewImage} alt="Airbnb Image" />
            <div className="star">
              <p >
                {city}, {state}
              </p>
              <p >{avgRating}</p>
            </div>
            <p >${price} night</p>
          </NavLink>
        </div>
      ))}
    </>
  );
}
