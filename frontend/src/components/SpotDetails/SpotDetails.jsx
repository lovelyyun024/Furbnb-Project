import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSpots } from "../../store/spots";
import { getOneSpot } from "../../store/spots";
import './SpotDetails.css'

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // console.log("id", spotId)

  const spotsData = useSelector((state) => state.spots.spot);
  // const numReviews = spotsData.numReviews?
  // const reviews = numReviews == 0 ? "" : ` · ${spotsData.numReviews} reviews `;
  //  const spotDetail = Object.values(spotsData);
  //  console.log("result", spotsData);
  //   console.log("result", spotsData.Owner);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotsData) return null;

  const verb = spotsData.numReviews === 1 ? "review" : "reviews";
  const reviews =
    spotsData.numReviews == 0 ? "" : ` · ${spotsData.numReviews} ${verb}`;

  return (
    <>
      <div>
        <h2>{spotsData.name}</h2>
        <h3>
          {spotsData.city}, {spotsData.state}, {spotsData.country}
        </h3>

        {spotsData.SpotImages.map(({ id, url }) => (
          <div key={id} className="spotImage">
            <img src={url} alt="Airbnb Image" />
            <p></p>
          </div>
        ))}

        <div style={{ borderBottom: "1px solid #000000" }}>
          <h2>
            Hosted by {spotsData.Owner.firstName} {spotsData.Owner.lastName}
          </h2>
          <p>{spotsData.description}</p>
          <div>
            <p>${spotsData.price} night</p>
            <p>
              {spotsData.avgRating} {reviews}
            </p>
            <button
              type="button"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Reserve
            </button>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}
