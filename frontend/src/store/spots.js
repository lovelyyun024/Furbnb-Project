import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

// get all spots
export const thunkFetchSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSpots(data.Spots));
  }

  return response;
};

//create a new spot
export const thunkCreateSpot = (spot, images) => async (dispatch) => {
   const response = await csrfFetch(`/api/spots`, {
     method: "POST",
     body: JSON.stringify(spot),
   });
  const data = await response.json();
  if (response.ok) {
    for (let i = 0; i < images.length; i++) {
      const imgObj = { url: images[i], preview: i === 0 };
      const imageRes = await csrfFetch(`/api/spots/${data.id}/images`, {
        method: "POST",
        body: JSON.stringify(imgObj),
      });
      if (imageRes.ok && i === 0) {
        const imageData = await imageRes.json();
        data.previewImage = imageData.url;
      }
    }
    dispatch(addSpot(data));
    return data;
  }

};

//edit spot
export const thunkUpdateSpot = (spot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(updateSpot(data));
  }
  return data;
};

//delete spot
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteSpot(spotId));
  }
  return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = { ...state };
      for (let spot of action.spots) {
        newState[spot.id] = spot;
      }
      return newState;
    }
    case ADD_SPOT: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      newState[action.spot.id].avgRating = "Not available";
      return newState;
    }
    case UPDATE_SPOT:{
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      if (state[action.spot.id]) {
        newState[action.spot.id].avgRating = state[action.spot.id].avgRating;
        newState[action.spot.id].previewImage = state[action.spot.id].previewImage;
      }
      return newState;
      }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
