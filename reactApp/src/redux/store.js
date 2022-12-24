import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import authModalSlice from "./features/authModalSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
  }
});

export default store;