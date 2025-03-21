import { createSlice } from "@reduxjs/toolkit";

const getInitialUserName = () => localStorage.getItem("user");
const getInitialUserEmail = () => localStorage.getItem("email");

export const authSlice = createSlice({
  name: "authSlice",
  initialState:{
    userName: getInitialUserName(),
    userEmail: getInitialUserEmail(),
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      localStorage.setItem("user", action.payload.name);
      localStorage.setItem("email", action.payload.email);
    },
    removeUser: (state) => {
      state.userName = null;
      state.userEmail = null;
      localStorage.removeItem("user");
      localStorage.removeItem("email");
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
