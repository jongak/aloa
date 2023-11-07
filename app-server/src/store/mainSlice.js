import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "review",
  initialState: { isDark: "dark" },
  reducers: {
    setIsDark(state, action) {
      state.isDark = action.payload.newIsDark;
    },
  },
});

export default mainSlice;
export const { setIsDark } = mainSlice.actions;
