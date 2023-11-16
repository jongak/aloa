import { createSlice } from "@reduxjs/toolkit";

const captureSlice = createSlice({
  name: "review",
  initialState: {
    rarityPreset: "custom",
    userData: {},
    frontItems: { todo: [], done: [] },
    frontIcons: { todo: [], done: [] },
    isName: true,
    isTitle: true,
    isLevel: false,
    isHolo: true,
    isGlow: true,
    isShine: true,
    isShadow: true,
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
    setIsName(state, action) {
      state.isName = action.payload.newIsName;
    },
    setIsTitle(state, action) {
      state.isTitle = action.payload.newIsTitle;
    },
    setIsLevel(state, action) {
      state.isLevel = action.payload.newIsLevel;
    },
    setIsHolo(state, action) {
      state.isHolo = action.payload.newIsHolo;
    },
    setIsGlow(state, action) {
      state.isGlow = action.payload.newIsGlow;
    },
    setIsShine(state, action) {
      state.isShine = action.payload.newIsShine;
    },
    setIsShadow(state, action) {
      state.isShadow = action.payload.newIsShadow;
    },
  },
});

export default captureSlice;
export const {
  setRarityPreset,
  setUserData,
  setFrontItems,
  setFrontIcons,
  setIsName,
  setIsTitle,
  setIsLevel,
  setIsHolo,
  setIsGlow,
  setIsShine,
  setIsShadow,
} = captureSlice.actions;
