import { configureStore } from "@reduxjs/toolkit";
import SidenavDisplaySlice from "./SidenavDisplaySlice";

export default configureStore({
  reducer: {
    SidenavDisplay: SidenavDisplaySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
