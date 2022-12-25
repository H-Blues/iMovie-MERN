import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import authModalSlice from "./features/authModalSlice";
import favouriteSlice from './features/favouriteSlice';
import reviewSlice from './features/reviewSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
    favourites: favouriteSlice,
    reviews: reviewSlice
  }
});

export default store;