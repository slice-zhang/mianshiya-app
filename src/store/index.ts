import { configureStore } from "@reduxjs/toolkit";
import userLogin from "./user";
const store = configureStore({
  reducer: {
    userLogin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
