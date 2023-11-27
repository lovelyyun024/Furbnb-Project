import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/getReviews";
const CREATE_REVIEWS = "reviews/createReview";

const loadReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const addReview = (review) => {
  return {
    type: CREATE_REVIEWS,
    review,
  };
};

//get all reviews
export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

//create a new review
export const createReview = (reviewData, spotId) => async (dispatch) => {
  const { review, stars } = reviewData;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars
    }),
  });
  const data = await response.json();
  dispatch(addReview(data));
  return data;
};

const initialState = { reviews: [] };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      // const newState = {};
      // action.reviews.Reviews.forEach(
      //   (review) => (newState[review.id] = review)
      // );
      // return newState;
        // console.log("label", action.reviews);
      return { ...state, reviews: [...action.reviews.Reviews] };
    }
    case CREATE_REVIEWS:
      // console.log(action.reviews)
      return { ...state, reviews: [...state.reviews, action.review] };
      // return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default reviewsReducer;
