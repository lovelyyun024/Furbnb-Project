// import { csrfFetch } from "./csrf";

const GET_USER_SPOTS = "userSpots/getUserSpots";
const RESET_USER_SPOTS = "userSpots/resetUserSpots";
const DELETE_USER_SPOTS = "userSpots/deleteUserSpots";

const getUserSpots = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots,
  };
};

export const resetUserSpots = () => {
  return {
    type: RESET_USER_SPOTS,
  };
};

export const deleteUserSpots = (spotId) => {
  return {
    type: DELETE_USER_SPOTS,
    spotId
  };
};


// get all user's spots
export const thunkFetchUserSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots/current");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSpots(data.Spots));
  }
    return response
};

// delete a user's spot
// export const thunkDeleteUserSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`, {
//     method: "DELETE",
//   });
//   if (response.ok) {
//     dispatch(deleteUserSpots(spotId));
//   }
//   return response;
// };

const initialState = {};

const userSpotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SPOTS: {
      const newState = { ...state };
      for (let spot of action.spots) {
        newState[spot.id] = spot;
      }
      return newState;
    }
    // case UPDATE_SPOT:
    //   return {
    //     ...state,
    //     spots: state.spots.map((spot) =>
    //       spot.id === action.spot.id ? action.spot : spot
    //     ),
    //   };
    case RESET_USER_SPOTS:{
        return {}
    }
    case DELETE_USER_SPOTS:{
        const newState = { ...state }
        delete newState[action.spotId]
        return newState
      }
    default:
      return state;
  }
};

export default userSpotsReducer;
