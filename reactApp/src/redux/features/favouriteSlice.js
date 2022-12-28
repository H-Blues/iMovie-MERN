import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "Favourite",
  initialState: {
    favouriteList: [],
    favouriteLength: 0,
  },
  reducers: {
    setFavouriteList: (state, action) => {
      state.favouriteList = action.payload;
    },
    addToFavourite: (state, action) => {
      state.favouriteList = [action.payload, ...state.favouriteList];
      state.favouriteLength++;
    },
    removeFromFavourite: (state, action) => {
      const mediaId = action.payload;
      state.favouriteList = state.favouriteList.filter(e => e !== mediaId);
      state.favouriteLength--;
    },
  }
});

export const { setFavouriteList, addToFavourite, removeFromFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
