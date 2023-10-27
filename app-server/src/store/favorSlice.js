import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const favorSlice = createSlice({
  name: "myFavor",
  initialState: { myFavor: [] },
  reducers: {
    pushFavor(state, action) {
      state.myFavor.push(action.payload.ticket);
      const tmp = async function () {
        await axios.post(
          "/favorite/" +
            action.payload.ticket.ticket_id +
            "/" +
            action.payload.user_id
        );
      };
      tmp();
    },
    popFavor(state, action) {
      state.myFavor.forEach((item, i) => {
        if (item.ticket_id === action.payload.ticket.ticket_id) {
          state.myFavor.splice(i, 1);
        }
      });

      const tmp = async function () {
        await axios.delete(
          "/favorite/" +
            action.payload.ticket.ticket_id +
            "/" +
            action.payload.user_id
        );
      };
      tmp();
    },
    setFavor(state, action) {
      state.myFavor = action.payload.newMyFavor;
    },
    deleteFavor(state, action) {
      state.myFavor = [];
    },
  },
});

export default favorSlice;
export const { pushFavor, popFavor, deleteFavor, setFavor } =
  favorSlice.actions;
