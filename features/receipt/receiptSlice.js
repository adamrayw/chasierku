import { createSlice } from "@reduxjs/toolkit";
import { voucher } from "../../data/voucher";

const initialState = {
  value: [],
  voucher,
  isVoucher: {
    isTrue: false,
    value: [],
  },
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
    getVoucher: (state, action) => {
      // get voucher from state voucher
      const voucher = state.voucher.find((v) => v.kode === action.payload);
      if (voucher) {
        state.isVoucher.isTrue = true;
        state.isVoucher.value = voucher;
      } else {
        state.isVoucher.isTrue = false;
        state.isVoucher.value = [];
      }
    },
  },
});

export const { addToReceipt, removeReceiptItem, getSubtotal, getVoucher } =
  receiptSlice.actions;

export default receiptSlice.reducer;
