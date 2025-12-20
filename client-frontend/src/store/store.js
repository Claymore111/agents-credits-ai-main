import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user-slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;