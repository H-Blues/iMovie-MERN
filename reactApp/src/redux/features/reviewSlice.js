import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "Review",
  initialState: {
    reviewList: [],
    reviewLength: 0,
  },
  reducers: {
    setReviewList: (state, action) => {
      state.reviewList = action.payload;
    },
    addReview: (state, action) => {
      state.reviewList = [action.payload, ...state.reviewList];
      state.reviewLength++;
    },
    removeReview: (state, action) => {
      const { reviewId } = action.payload;
      state.reviewList = [...state.reviewList].filter(e => e.reviewId.toString() !== reviewId.toString());
      state.reviewLength--;
    },
  }
});

export const { setReviewList, addReview, removeReview } = reviewSlice.actions;
export default reviewSlice.reducer;
