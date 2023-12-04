import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "myLogin",
  initialState: { is_signed: false, user_pid: -1, role: false, name: "" },
  reducers: {
    signin: function (state, action) {
      state.is_signed = true;
      state.user_pid = action.payload.newUser.pid;
      state.role = action.payload.newUser.role;
      state.name = action.payload.newUser.name;
    },
  },
});

export default loginSlice;
export const { signin } = loginSlice.actions;
