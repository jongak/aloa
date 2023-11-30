import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "myLogin",
  initialState: { is_signed: false, user_id: -1, is_manager: false },
  reducers: {
    signin: function (state, action) {
      state.is_signed = true;
      state.user_id = action.payload.user_id;
    },
    setIsManager: function (state, action) {
      state.is_manager = action.payload.is_manager;
    },
    signout: function (state, action) {
      state.is_signed = false;
      state.user_id = -1;
      state.is_manager = false;
    },
  },
});

export default loginSlice;
export const { signin, signout, setIsManager } = loginSlice.actions;
