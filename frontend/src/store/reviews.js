const GET_REVIEWS = "reviews/getReviews"

const loadReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newState = {};
      action.reviews.Reviews.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
