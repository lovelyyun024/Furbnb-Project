import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots";
import { createSpotImg } from "../../store/spotImages";
import "./CreateSpot.css";
import { useNavigate } from "react-router-dom";

const CreateSpot = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(
    ""
  );
  const [price, setPrice] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  const [preview, setPreview] = useState("false");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const spotsData = useSelector((state) => state.spots.spots);
  // const { closeModal } = useModal();
  const spotId = spotsData?.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url1) {
      return setErrors({
        url1: "Preview image is required.",
      });
    }
    {
      dispatch(
        spotActions.createSpot({
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
        })
      )
        // .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log("label", data)
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  if (spotId) {
    const imgArray = [url1, url2, url3, url4, url5];

    imgArray.forEach((url) => {
      if (url) {
        const objImg = { url: url, preview: preview };
        dispatch(createSpotImg(objImg, spotId), [dispatch]);
      }
    });

    // reset()
    navigate(`/spots/${spotId}`);
  }

  // const reset = () => {
  //      setAddress("");
  //      setCity("");
  //      setState("");
  //      setCountry("");
  //      setLat("");
  //      setLng("");
  //      setName("");
  //      setDescription("");
  //      setPrice("");
  //      setUrl1("");
  //      setUrl2("");
  //      setUrl3("");
  //      setUrl4("");
  //      setUrl5("");
  //      setPreview("true");
  // };

  return (
    <>
      <div id="form-container" style={{ width: "50%" }}>
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              // borderBottom: "1px solid #000000",
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            {errors.country && <p className="error">{errors.country}</p>}

            <label>Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <div className="city-container">
              <label>City</label>
              <label>State</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />

              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              />
              {errors.city && <p className="error">{errors.city}</p>}
              {errors.state && <p className="error">{errors.state}</p>}
            </div>
            <div className="city-container">
              <label>Latitude</label>
              <label>Longitude</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
              />

              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
              />
              {errors.lat && <p className="error">{errors.lat}</p>}
              {errors.lng && <p className="error">{errors.lng}</p>}
            </div>
            <p></p>
            <div>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  borderTop: "1px solid #555555",
                }}
              />
            </div>
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities
              like fast wif or parking, and what you love about the
              neighborhood.
            </p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please write at least 30 characters"
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <p></p>
            <div>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  borderTop: "1px solid #555555",
                }}
              />
            </div>
            <h2>Create a title for your spot</h2>
            <p>
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your spot"
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <p></p>
            <div>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  borderTop: "1px solid #555555",
                }}
              />
            </div>

            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>

            <p>
              $ &nbsp;
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per night (USD)"
              />
            </p>
            {errors.price && <p className="error">{errors.price}</p>}

            {/* </div> */}
            <div>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  borderTop: "1px solid #555555",
                }}
              />
            </div>
            <div>
              <h3>Liven up your spot with photos</h3>
              <p>Submit a link to at least one photo to publish your spot.</p>
              <div
                style={{
                  // borderBottom: "1px solid #000000",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="text"
                  value={url1}
                  onChange={(e) => {
                    setUrl1(e.target.value);
                    setPreview("true");
                  }}
                  placeholder="Preview Image URL"
                />
                {errors.url1 && <p className="error">{errors.url1}</p>}
                <p></p>
                <input
                  type="text"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="Image URL"
                />
                {errors.url2 && <p className="error">{errors.url2}</p>}
                <p></p>
                <input
                  type="text"
                  value={url3}
                  onChange={(e) => setUrl3(e.target.value)}
                  placeholder="Image URL"
                />
                {errors.url3 && <p className="error">{errors.url3}</p>}
                <p></p>
                <input
                  type="text"
                  value={url4}
                  onChange={(e) => setUrl4(e.target.value)}
                  placeholder="Image URL"
                />
                {errors.url4 && <p className="error">{errors.url4}</p>}
                <p></p>
                <input
                  type="text"
                  value={url5}
                  onChange={(e) => setUrl5(e.target.value)}
                  placeholder="Image URL"
                />
                {errors.url5 && <p className="error">{errors.url5}</p>}
              </div>
            </div>
            <div>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  borderTop: "1px solid #555555",
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                style={{ backgroundColor: "red", color: "white" }}
              >
                Create Spot
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSpot;
