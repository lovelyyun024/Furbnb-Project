import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as spotActions from "../../store/spots";
import "./SpotDetails.css";
import {thunkFetchSingleSpot} from '../../store/singleSpot'

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // let value = 0;

  const spotsData = useSelector((state) => state.singleSpot);
  const spotImg = spotsData.SpotImages;

  useEffect(() => {
    dispatch(thunkFetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotsData) return null;
  if (!spotImg) return null;

  const verb = spotsData.numReviews === 1 ? "review" : "reviews";
  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb}`;

  return (
    <>
      <div className="spot-detail-container">
        <h1>{spotsData.name}</h1>
        <h2>
          {spotsData.city}, {spotsData.state}, {spotsData.country}
        </h2>
        <div className="image-container">
          {spotImg.map(({ id, url }, value) => (
            <div key={id} className={`Image${value + 1}`}>
              {url && <img src={url} alt={`Furbnb Image${value + 1}`} />}
            </div>
          ))}
        </div>

        <div className="detail-container">
          <div className="des-container">
            <div className="detial-title">
              Hosted by {spotsData.Owner.firstName}&nbsp;
              {spotsData.Owner.lastName}
            </div>
            <p>{spotsData.description}</p>
          </div>

          <div className="res-container">
            <div className="res-price">
              <div><span style={{fontSize:"20px", fontWeight:"600"}}>${spotsData.price}</span> night</div>
              <div className="res-review">
                {spotsData.avgRating} {reviews}
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert("Feature Coming Soon...")}
              className="reserve"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
      <hr className="detail-divider" />
    </>
  );
}
