import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import LoggedUserReducer from "./LoggedUserSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    loggedUser: LoggedUserReducer,
  },
});
