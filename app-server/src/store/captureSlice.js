import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "review",
  initialState: {
    rarityPreset: "custom",
    userData: {},
    frontItems: { todo: [], done: [] },
    frontIcons: { todo: [], done: [] },
  },
  reducers: {
    setRarityPreset(state, action) {
      state.rarityPreset = action.payload.newRarityPreset;
    },
    setUserData(state, action) {
      state.userData = action.payload.newUserData;
    },
    setFrontItems(state, action) {
      state.frontItems = action.payload.newFrontItems;
    },
    setFrontIcons(state, action) {
      state.frontIcons = action.payload.newFrontIcons;
    },
  },
});

export default captureSlice;
export const { setRarityPreset, setUserData, setFrontItems, setFrontIcons } =
  captureSlice.actions;
