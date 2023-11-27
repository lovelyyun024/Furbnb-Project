import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const CREATE_SPOT = "spots/createSpot";
const UPDATE_SPOT = "spots/editSpot";
const REMOVE_SPOT = "spots/removeSpot";

const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
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
    type: REMOVE_SPOT,
    spotId,
  };
};

// get all spots
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

// get all user's spots
export const getOwnerSpot = () => async (dispatch) => {
  const response = await fetch("/api/spots/current");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

// get the details of one spot
export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

//create a new spot
export const createSpot = (spot) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    spot;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  const data = await response.json();
  dispatch(addSpot(data));
  return data;
};

//edit a new spot
export const editSpot = (spot, spotId) => async (dispatch) => {
  console.log("here", spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    spot;
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  const data = await response.json();
  dispatch(updateSpot(data));
  return data;
};

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  dispatch(deleteSpot(spotId));
  return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {};
      // console.log(action.spots)
      if (Array.isArray(action.spots.Spots)) {
        action.spots.Spots.forEach((spot) => (newState[spot.id] = spot));
        return newState;
      }
      return action.spots;
    }
    case CREATE_SPOT:
      return { ...state, spots: action.spot };
    case UPDATE_SPOT:
      return { ...state, spots: action.spot };
    case REMOVE_SPOT:
      const newState = { ...state }
      delete newState[action.spotId]
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
