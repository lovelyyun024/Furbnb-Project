const GET_ALL_SPOTS = "spots/getAllSpots";

const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
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

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {};
    //   console.log("result", action.spots.Spots)
    //   console.log(Object.keys(action.spots));
      action.spots.Spots.forEach((spot) => (newState[spot.id] = spot));
    //   return { ...state,  ...action.spots.Spots  };
     return newState;
    }
    default:
      return state;
  }
}

export default spotsReducer;
