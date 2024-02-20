const GET_SPOT = "singleSpot/getSpot";

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot
  };
};

// get the details of one spot
export const thunkFetchSingleSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSpot(data));
  }

  return response;
};

const initialState = {};

const singleSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT: {
      return action.spot;
    }
    default:
      return state;
  }
};

export default singleSpotReducer;
