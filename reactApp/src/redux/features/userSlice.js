import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: {
      username: 'Default User',
      email: 'example@mail.com',
      address: 'Waterford, Ireland',
      phone: '353 123456',
    },
    authToken: localStorage.getItem('token'),
    isAuthenticated: false
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
    },
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.authToken = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setUserInfo, setToken, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
