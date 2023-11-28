import { configureStore } from "@reduxjs/toolkit";

import captureSlice from "./captureSlice";
import mainSlice from "./mainSlice";

const store = configureStore({
  reducer: {
    captureSlice: captureSlice.reducer,
    mainSlice: mainSlice.reducer,
  },
});

export default store;
