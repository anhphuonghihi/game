import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./features/gameSlice";
export const store = configureStore({
  reducer: { topics: gameSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
