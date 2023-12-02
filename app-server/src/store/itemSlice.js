import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "review",
  initialState: {
    userData: {},
    frontItems: { todo: [], done: [] },
    frontIcons: { todo: [], done: [] },
    optionItems: { todo: [], done: [] },
    isName: true,
    isTitle: true,
    isLevel: false,
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload.newUserData;
    },
    setFrontItems(state, action) {
      state.frontItems = action.payload.newFrontItems;
    },
    setFrontIcons(state, action) {
      state.frontIcons = action.payload.newFrontIcons;
    },
    setOptionItems(state, action) {
      state.optionItems = action.payload.newOptionItems;
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
  },
});

export default itemSlice;
export const {
  setUserData,
  setFrontItems,
  setFrontIcons,
  setOptionItems,
  setIsName,
  setIsTitle,
  setIsLevel,
} = itemSlice.actions;
