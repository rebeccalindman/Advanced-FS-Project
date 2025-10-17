import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice"; // ✅ Ensure this path is correct

export const store = configureStore({
  reducer: {
    notes: notesReducer, // ✅ Must match what is used in `useSelector`
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
