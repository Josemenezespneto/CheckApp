import { createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api/index";

const initialState = {
  user: null,
  token: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loggedIn = true;
      api.setAuthToken(state.token)
      
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      api.setAuthToken(null)
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
