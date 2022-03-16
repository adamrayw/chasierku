import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    addToReceipt: (state, action) => {
      const tempMenu = { ...action.payload };
      state.value.push(tempMenu);
    },
  },
});

export const { addToReceipt } = receiptSlice.actions;

export default receiptSlice.reducer;
