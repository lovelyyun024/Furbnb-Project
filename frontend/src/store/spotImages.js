import { csrfFetch } from "./csrf";
const CREATE_SPOT_IMG = "spots/createSpotImg";


const addSpotImage = (img) => {
  return {
    type: CREATE_SPOT_IMG,
    img,
  };
};

//create a spot img
export const createSpotImg = (img, spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(img),
  });
  if (response.ok) {
  const data = await response.json();
  dispatch(addSpotImage(data));

}
};

const initialState = {};

const spotImagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SPOT_IMG: {
    
     return { ...state };
    }
    default:
      return state;
  }
};

export default spotImagesReducer;
