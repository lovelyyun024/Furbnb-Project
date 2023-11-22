const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_ONE_SPOT = "spots/getOneSpot";

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

export const getAllSpots = () => async (dispatch) => {

  const response = await fetch("/api/spots");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {

  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    // console.log("detail",data)
    dispatch(loadOneSpot(data));
    return data;
  }
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
      newState.spot = action.spot
      return newState
    }
    default:
      return state;
  }
};

export default spotsReducer;
