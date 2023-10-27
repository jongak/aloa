import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "review",
  initialState: { rarityPreset: "custom" },
  reducers: {
    setRarityPreset(state, action) {
      state.rarityPreset = action.payload.newRarityPreset;
    },
  },
});

export default captureSlice;
export const { setRarityPreset } = captureSlice.actions;
