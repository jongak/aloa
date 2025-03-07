import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "review",
  initialState: {
    characterId: "",
    userData: {},
    frontItems: { todo: [], done: [] },
    frontIcons: { todoCombat: [], todoNaesil: [], done: [] },
    optionItems: { todoCombat: [], todoNaesil: [], done: [] },
    isName: true,
    isTitle: true,
    isLevel: false,
    isGothic: false,
    acc: "-",
  },
  reducers: {
    setCharacterId(state, action) {
      state.characterId = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
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
    setIsGothic(state, action) {
      state.isGothic = action.payload.newIsGothic;
    },
    setAcc(state, action) {
      state.acc = action.payload.newAcc;
    },
  },
});

export default itemSlice;
export const {
  setCharacterId,
  setUserData,
  setFrontItems,
  setFrontIcons,
  setOptionItems,
  setIsName,
  setIsTitle,
  setIsLevel,
  setIsGothic,
  setAcc,
} = itemSlice.actions;
