import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  subTotal: 0,
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
    getSubtotal: (state, action) => {
      // get subtotal from state value
      let { subtotal, quantity } = state.value.reduce(
        (cartSubtotal, cartItem) => {
          const { price, qty } = cartItem;

          cartSubtotal.subtotal += price;

          return cartSubtotal;
        },
        {
          subtotal: 0,
        }
      );
      state.subTotal = subtotal;
    },
  },
});

export const { addToReceipt, removeReceiptItem, getSubtotal } =
  receiptSlice.actions;

export default receiptSlice.reducer;
