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
    removeReceiptItem: (state, action) => {
      // get id from state value
      const itemIndex = state.value.findIndex(
        (index) => index.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.value[itemIndex]) {
          state.value.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addToReceipt, removeReceiptItem } = receiptSlice.actions;

export default receiptSlice.reducer;
