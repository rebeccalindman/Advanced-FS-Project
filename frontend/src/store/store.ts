import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice"; 
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer, // Must match what is used in `useSelector`
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
