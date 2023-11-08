import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "review",
  initialState: { isDark: "dark", isThemaOpen: true },
  reducers: {
    setIsDark(state, action) {
      state.isDark = action.payload.newIsDark;
    },
    setIsThemaOpen(state, action) {
      state.isThemaOpen = action.payload.newIsThemaOpen;
    },
  },
});

export default mainSlice;
export const { setIsDark, setIsThemaOpen } = mainSlice.actions;
