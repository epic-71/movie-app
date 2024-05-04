import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("loggedUser")) || {};

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    storeLoggedUser: (state, action) => {
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { storeLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
