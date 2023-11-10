import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "review",
  initialState: { rarityPreset: "custom", userData: {} },
  reducers: {
    setRarityPreset(state, action) {
      state.rarityPreset = action.payload.newRarityPreset;
    },
    setUserData(state, action) {
      state.userData = action.payload.newUserData;
    },
  },
});

export default captureSlice;
export const { setRarityPreset, setUserData } = captureSlice.actions;
