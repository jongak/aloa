import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import pageSlice from "./pageSlice";
import cartSlice from "./cartSlice";
import mapSlice from "./mapSlice";
import captureSlice from "./captureSlice";
import favoriteSlice from "./favorSlice";
import mainSlice from "./mainSlice";

const store = configureStore({
  reducer: {
    captureSlice: captureSlice.reducer,
    mainSlice: mainSlice.reducer,

    myLoginSlice: loginSlice.reducer,
    myPageSlice: pageSlice.reducer,
    myCartSlice: cartSlice.reducer,
    myMapSlice: mapSlice.reducer,
    myFavorSlice: favoriteSlice.reducer,
  },
});

export default store;
