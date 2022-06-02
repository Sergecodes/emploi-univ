import { configureStore } from "@reduxjs/toolkit";
import SidenavDisplaySlice from "./SidenavDisplaySlice";
import ModalDisplaySlice from "./ModalDisplaySlice";

export default configureStore({
  reducer: {
    SidenavDisplay: SidenavDisplaySlice,
    ModalDisplay:ModalDisplaySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
