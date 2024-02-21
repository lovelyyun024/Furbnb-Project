import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/getReviews";
const RESET_REVIEWS = "reviews/resetReviews";
const ADD_REVIEW = "reviews/addReview";
const DELETE_REVIEW = "spots/deleteReview";

const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const resetReviews = () => {
  return {
    type: RESET_REVIEWS,
  };
};

const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//get all reviews
export const thunkFetchReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getReviews(data.Reviews));
    return data;
  }
};

//create a new review
export const thunkcreateReview = (reviewData, spotId) => async (dispatch) => {
  const { review, stars } = reviewData;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars,
    }),
  });
  const data = await response.json();
  dispatch(addReview(data));
  return data;
};

//delete review
export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
  return response;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newState = { ...state };
      for (let review of action.reviews) {
        newState[review.id] = review;
      }
      return newState;
    }
    case RESET_REVIEWS: {
      return {};
    }
    case ADD_REVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case DELETE_REVIEW:{
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
