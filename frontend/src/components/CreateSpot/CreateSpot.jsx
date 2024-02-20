import { useState } from "react";
import { useDispatch} from "react-redux";
import * as spotActions from "../../store/spots";
import { thunkFetchSpots } from "../../store/spots";
import "./CreateSpot.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateSpot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchSpots());
  }, [dispatch]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const updateImages = (value, index) => {
    let imageArr = [...images];
    imageArr[index] = value;
    setImages(imageArr);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   const spotData = {
  //     address,
  //     city,
  //     state,
  //     country,
  //     lat,
  //     lng,
  //     name,
  //     description,
  //     price,
  //   };

  //   if (!images[0]) {
  //     setErrors({
  //       url: "Preview image is required.",
  //     });
  //     return;
  //   }

  //   const handleSubmit = async (spot) => {
  //     const data = await dispatch(spotActions.thunkCreateSpot(spot, images));
  //     console.log("+++++", data);
  //     if (!data.errors) {
  //       navigate(`/spots/${data.id}`);
  //     } else {
  //       setErrors(data.errors);
  //     }
  //   };
  //   handleSubmit(spotData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spotData = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    if (!images[0]) {
      setErrors({
        url: "Preview image is required.",
      });
      return;
    } else {
      dispatch(spotActions.thunkCreateSpot(spotData, images)).then((spot)=>{
        navigate(`/spots/${spot.id}`)})
        .catch(async (res) => {
          const data = await res.json();
          console.log("label", data);
          if (data?.errors) {
            setErrors(data.errors);
          }
        }
      );
    }
  };

  return (
    <>
      <div id="form-container">
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="spot-form">
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            {errors.country && <span className="error">{errors.country}</span>}

            <label>Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            {errors.address && <span className="error">{errors.address}</span>}
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
              {errors.city && <span className="error">{errors.city}</span>}
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
            <div className="city-container">
              <label>Latitude</label>
              <label>Longitude</label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Latitude"
              />

              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Longitude"
              />
              {errors.lat && <span className="error">{errors.lat}</span>}
              {errors.lng && <span className="error">{errors.lng}</span>}
            </div>
            <div>
              <hr className="form-divider" />
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
              <span className="error">{errors.description}</span>
            )}

            <div>
              <hr className="form-divider" />
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
            {errors.name && <span className="error">{errors.name}</span>}
            <div>
              <hr className="form-divider" />
            </div>
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <div>
              $ &nbsp;
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price per night (USD)"
              />
            </div>
            {errors.price && <span className="error">{errors.price}</span>}
            <div>
              <hr className="form-divider" />
            </div>
            <div>
              <h3>Liven up your spot with photos</h3>
              <p>Submit a link to at least one photo to publish your spot.</p>
              <div className="img-input">
                <input
                  type="text"
                  value={images[0]}
                  onChange={(e) => {
                    updateImages(e.target.value, 0);
                  }}
                  placeholder="Preview Image URL"
                />
                {errors.url && <span className="error">{errors.url}</span>}
                <input
                  type="text"
                  value={images[1]}
                  onChange={(e) => {
                    updateImages(e.target.value, 1);
                  }}
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={images[2]}
                  onChange={(e) => {
                    updateImages(e.target.value, 2);
                  }}
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={images[3]}
                  onChange={(e) => {
                    updateImages(e.target.value, 3);
                  }}
                  placeholder="Image URL"
                />
                <input
                  type="text"
                  value={images[4]}
                  onChange={(e) => {
                    updateImages(e.target.value, 4);
                  }}
                  placeholder="Image URL"
                />
              </div>
            </div>
            <div>
              <hr className="form-divider" />
            </div>
            <button type="submit">Create Spot</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSpot;
