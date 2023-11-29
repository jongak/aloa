import { configureStore } from "@reduxjs/toolkit";

import captureSlice from "./captureSlice";
import mainSlice from "./mainSlice";
import itemSlice from "./itemSlice";

const store = configureStore({
  reducer: {
    captureSlice: captureSlice.reducer,
    mainSlice: mainSlice.reducer,
    itemSlice: itemSlice.reducer,
  },
});

export default store;
