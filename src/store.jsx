import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/authSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
