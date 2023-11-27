import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const CREATE_SPOT = "spots/createSpot";
const UPDATE_SPOT = "spots/editSpot";

const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const loadOneSpot = (spot) => {
  return {
    type: GET_ONE_SPOT,
    spot,
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
    dispatch(loadOneSpot(data));
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

export const editSpot = (spot, spotId) => async (dispatch) => {
  console.log("here", spotId)
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
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {};
      action.spots.Spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }
    case GET_ONE_SPOT: {
      const newState = {};
      newState.spot = action.spot;
      return newState;
    }
    case CREATE_SPOT:
      return { ...state, spots: action.spot };
    case UPDATE_SPOT:
      return { ...state, spots: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
