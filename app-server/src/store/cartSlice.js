import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "myCart",
  initialState: { myCarts: [], amount: [] },
  reducers: {
    push(state, action) {
      state.myCarts.push(action.payload.ticket);
    },
    pop(state, action) {
      state.myCarts.splice(action.payload.index, 1);
    },
    change(state, action) {
      state.myCarts[action.payload.index] = action.payload.updateItem;
    },
    deletes(state, action) {
      state.myCarts = [];
    },
    setAmount(state, action) {
      state.amount = action.payload.newAmount;
    },
  },
});

export default cartSlice;
export const { push, pop, change, deletes, setAmount } = cartSlice.actions;
