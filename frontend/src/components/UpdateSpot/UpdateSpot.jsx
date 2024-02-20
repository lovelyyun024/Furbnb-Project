import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as spotActions from "../../store/spots";
import { useNavigate } from "react-router-dom";
import { thunkFetchSingleSpot } from "../../store/singleSpot";

const UpdateSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const navigate = useNavigate();

  const spotsData = useSelector((state) => state.singleSpot);
   const image = spotsData?.SpotImages || []; 

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
  const updateImages = (value, index) => {
    let imageArr = [...images];
    imageArr[index] = value;
    setImages(imageArr);
  };

  useEffect(() => {dispatch(thunkFetchSingleSpot(spotId))}, [dispatch, spotId]);

  useEffect(() => {
    setAddress(spotsData.address || "");
    setCity(spotsData.city || "");
    setState(spotsData.state || "");
    setCountry(spotsData.country || "");
    setLat(spotsData.lat || "");
    setLng(spotsData.lng || "");
    setName(spotsData.name || "");
    setDescription(spotsData.description || "");
    setPrice(spotsData.price || "");
    {let imagesArr = []; 
   const previewImage = image.find( (image) => image.preview == true);
   if (previewImage) imagesArr.push(previewImage.url);
   image.forEach((image) => {
     if (image.preview == false) imagesArr.push(image.url);
   });
   while (imagesArr.length < 5) {
     imagesArr.push("");
   }
   setImages(imagesArr);
 } 
  }, [spotsData, image]);

  const handleSubmit = (e) => {
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
   dispatch(spotActions.thunkUpdateSpot(spotData, spotId))
     .then(() => {navigate(`/spots/${spotId}`) })
     .catch(async (res) => {
       const data = await res.json();
       console.log("label", data);
       if (data?.errors) {
         setErrors(data.errors);
       }
     });
 }
  };

  return (
    <>
      <div id="form-container">
        <h1>Update your Spot</h1>
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
            />
            {errors.country && <span className="error">{errors.country}</span>}

            <label>Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <span className="error">{errors.address}</span>}
            <div className="city-container">
              <label>City</label>
              <label>State</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
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
              />

              <input
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
              {errors.lat && <p className="error">{errors.lat}</p>}
              {errors.lng && <p className="error">{errors.lng}</p>}
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
                />
                {errors.url && <span className="error">{errors.url}</span>}
                <input
                  type="text"
                  value={images[1]}
                  onChange={(e) => {
                    updateImages(e.target.value, 1);
                  }}
                />
                <input
                  type="text"
                  value={images[2]}
                  onChange={(e) => {
                    updateImages(e.target.value, 2);
                  }}
                />
                <input
                  type="text"
                  value={images[3]}
                  onChange={(e) => {
                    updateImages(e.target.value, 3);
                  }}
                />
                <input
                  type="text"
                  value={images[4]}
                  onChange={(e) => {
                    updateImages(e.target.value, 4);
                  }}
                />
              </div>
            </div>
            <div>
              <hr className="form-divider" />
            </div>
              <button type="submit">Update your Spot</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateSpot;
