import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 123,
    userid: "epic71",
    role: "admin",
    email: "epic@gmail.com",
    password: "epiC@1",
  },
  {
    id: 4336,
    userid: "rashad",
    role: "user",
    email: "rashad@gmail.com",
    password: "rashaD@1",
  },
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem("users", JSON.stringify(state));
      return [...state, action.payload];
    },
  },
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
