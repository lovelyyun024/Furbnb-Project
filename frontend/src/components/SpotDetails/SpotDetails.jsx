import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import "./SpotDetails.css";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // let value = 0;

  const spotsData = useSelector((state) => state.spots);
  const spotImg = spotsData.SpotImages;

  useEffect(() => {
    dispatch(spotActions.getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotsData) return null;
  if (!spotImg) return null;

  const verb = spotsData.numReviews === 1 ? "review" : "reviews";
  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb}`;

  return (
    <>
      <div>
        <h1>{spotsData.name}</h1>
        <h2>
          {spotsData.city}, {spotsData.state}, {spotsData.country}
        </h2>
        <div className="image-container">
          {spotImg.map(({ id, url }, value) => (
            <div key={id} className={`Image${value + 1}`}>
              <img src={url} alt={`Furbnb Image${value + 1}`} />
            </div>
          ))}
        </div>

        <div
          style={{ borderBottom: "1px solid #000000" }}
          id="detail-container"
        >
          <div className="des-container">
            <h1>
              Hosted by {spotsData.Owner.firstName}&nbsp;
              {spotsData.Owner.lastName}
            </h1>
            <p>{spotsData.description}</p>
          </div>

          <div className="res-container">
            {/* <div className="res-container1"> */}
            <p className="price">
              <span style={{ fontSize: "16pt" }}>${spotsData.price} </span>
              night
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
              {spotsData.avgRating} {reviews}
            </p>
            <button
              type="button"
              onClick={() => alert("Feature Coming Soon...")}
              className="reserve"
            >
              Reserve
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
