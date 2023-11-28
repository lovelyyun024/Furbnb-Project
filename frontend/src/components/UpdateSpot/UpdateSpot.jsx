import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as spotActions from "../../store/spots";
import "./UpdateSpot.css";
import { useNavigate } from "react-router-dom";

const UpdateSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const navigate = useNavigate();

  const spotsData = useSelector((state) => state.spots);
  const img = spotsData.SpotImages;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  const [preview, setPreview] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(spotActions.getOneSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    setAddress(spotsData.address);
    setCity(spotsData.city);
    setState(spotsData.state);
    setCountry(spotsData.country);
    setLat(spotsData.lat);
    setLng(spotsData.lng);
    setName(spotsData.name);
    setDescription(spotsData.description);
    setPrice(spotsData.price);
    if (img) {
      setUrl1(img[0].url);
    }
  }, [spotsData, img]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      spotActions.editSpot(
        {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
        },
        spotId
      )
    )
      .then(() => {
        // If the dispatch is successful, navigate to the desired page
        navigate(`/spots/${spotId}`);
      })

      .catch(async (res) => {
        const data = await res.json();
        console.log("label", data);
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  //   return (
  //     <>
  //       <h1>Update your Spot</h1>
  //       <h3>Where&apos;s your place located?</h3>
  //       <p>
  //         Guests will only get your exact address once they booked a reservation.
  //       </p>
  //       <form onSubmit={handleSubmit}>
  //         <div
  //           style={{
  //             borderBottom: "1px solid #000000",
  //             display: "flex",
  //             flexDirection: "column",
  //             marginBottom: "10px",
  //           }}
  //         >
  //           <label>Country</label>
  //           <input
  //             type="text"
  //             value={country}
  //             onChange={(e) => setCountry(e.target.value)}
  //             // required
  //           />
  //           {errors.country && <p>{errors.country}</p>}

  //           <label>Street Address</label>
  //           <input
  //             type="text"
  //             value={address}
  //             onChange={(e) => setAddress(e.target.value)}
  //             // required
  //           />
  //           {errors.address && <p>{errors.address}</p>}

  //           <label>City</label>
  //           <input
  //             type="text"
  //             value={city}
  //             onChange={(e) => setCity(e.target.value)}
  //             // required
  //           />
  //           {errors.city && <p>{errors.city}</p>}

  //           <label>State</label>
  //           <input
  //             type="text"
  //             value={state}
  //             onChange={(e) => setState(e.target.value)}
  //             // required
  //           />
  //           {errors.state && <p>{errors.state}</p>}

  //           <label>Latitude</label>
  //           <input
  //             type="text"
  //             value={lat}
  //             onChange={(e) => setLat(e.target.value)}
  //           />
  //           {errors.lat && <p>{errors.lat}</p>}

  //           <label>Longitude</label>
  //           <input
  //             type="text"
  //             value={lng}
  //             onChange={(e) => setLng(e.target.value)}
  //           />
  //           {errors.lng && <p>{errors.lng}</p>}
  //           <p></p>
  //         </div>

  //         <div style={{ borderBottom: "1px solid #000000" }}>
  //           <h3>Describe your place to guests</h3>
  //           <p>
  //             Mention the best features of your space, any special amentities like
  //             fast wif or parking, and what you love about the neighborhood.
  //           </p>
  //           <input
  //             type="text"
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //             // required
  //           />
  //           {errors.description && <p>{errors.description}</p>}
  //           <p></p>
  //         </div>

  //         <div style={{ borderBottom: "1px solid #000000" }}>
  //           <h3>Create a title for your spot</h3>
  //           <p>
  //             Catch guests&apos; attention with a spot title that highlights what
  //             makes your place special.
  //           </p>
  //           <input
  //             type="text"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             // required
  //           />
  //           {errors.name && <p>{errors.name}</p>}
  //           <p></p>
  //         </div>

  //         <div style={{ borderBottom: "1px solid #000000" }}>
  //           <h3>Set a base price for your spot</h3>
  //           <p>
  //             Competitive pricing can help your listing stand out and rank higher
  //             in search results.
  //           </p>
  //           <div>
  //             $ &nbsp;
  //             <input
  //               type="text"
  //               value={price}
  //               onChange={(e) => setPrice(e.target.value)}
  //               // required
  //             />
  //             {errors.price && <p>{errors.price}</p>}
  //           </div>
  //           <p></p>
  //         </div>

  //         <div style={{ borderBottom: "1px solid #000000" }}>
  //           <h3>Liven up your spot with photos</h3>
  //           <p>Submit a link to at least one photo to publish your spot.</p>
  //           <div
  //             style={{
  //               borderBottom: "1px solid #000000",
  //               display: "flex",
  //               flexDirection: "column",
  //               marginBottom: "10px",
  //             }}
  //           >
  //             <input
  //               type="text"
  //               value={url1}
  //               onChange={(e) => {
  //                 setUrl1(e.target.value);
  //                 setPreview("true");
  //               }}
  //               // required
  //             />
  //             {errors.url1 && <p style={{ color: "#FF0000" }}>{errors.url1}</p>}

  //             <input
  //               type="text"
  //               value={url2}
  //               onChange={(e) => setUrl2(e.target.value)}
  //             />
  //             {errors.url2 && <p>{errors.url2}</p>}

  //             <input
  //               type="text"
  //               value={url3}
  //               onChange={(e) => setUrl3(e.target.value)}
  //             />
  //             {errors.url3 && <p>{errors.url3}</p>}

  //             <input
  //               type="text"
  //               value={url4}
  //               onChange={(e) => setUrl4(e.target.value)}
  //             />
  //             {errors.url4 && <p>{errors.url4}</p>}

  //             <input
  //               type="text"
  //               value={url5}
  //               onChange={(e) => setUrl5(e.target.value)}
  //             />
  //             {errors.url5 && <p>{errors.url5}</p>}
  //           </div>

  //           <p></p>
  //         </div>

  //         <div>
  //           <p></p>
  //           <button type="submit">Update Spot</button>
  //         </div>
  //       </form>
  //     </>
  //   );
  // };

  return (
    <>
      <div id="form-container" style={{ width: "50%" }}>
        <h1>Update your Spot</h1>
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
              // required
            />
            {errors.country && <p className="error">{errors.country}</p>}

            <label>Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              // required
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <div className="city-container">
              <label>City</label>
              <label>State</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                // required
              />

              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                // required
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
              />

              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
              {errors.lat && <p className="error">{errors.lat}</p>}
              {errors.lng && <p className="error">{errors.lng}</p>}
            </div>

            {/* <div style={{ borderBottom: "1px solid #000000" }}> */}
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
              <p className="error">{errors.description}</p>
            )}
            {/* </div> */}

            {/* <div style={{ borderBottom: "1px solid #000000" }}> */}
            <h2>Create a title for your spot</h2>
            <p>
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
            {errors.name && <p className="error">{errors.name}</p>}
            {/* </div> */}

            {/* <div style={{ borderBottom: "1px solid #000000", width: "100%" }}> */}
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
              />
            </p>
            {errors.price && <p className="error">{errors.price}</p>}

            {/* </div> */}

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
                  // required
                />
                {errors.url1 && <p className="error">{errors.url1}</p>}
                <p></p>
                <input
                  type="text"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                />
                {errors.url2 && <p className="error">{errors.url2}</p>}
                <p></p>
                <input
                  type="text"
                  value={url3}
                  onChange={(e) => setUrl3(e.target.value)}
                />
                {errors.url3 && <p className="error">{errors.url3}</p>}
                <p></p>
                <input
                  type="text"
                  value={url4}
                  onChange={(e) => setUrl4(e.target.value)}
                />
                {errors.url4 && <p className="error">{errors.url4}</p>}
                <p></p>
                <input
                  type="text"
                  value={url5}
                  onChange={(e) => setUrl5(e.target.value)}
                />
                {errors.url5 && <p className="error">{errors.url5}</p>}
                <p></p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button type="submit">Create Spot</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};


export default UpdateSpot;
