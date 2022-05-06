import { createSlice } from "@reduxjs/toolkit";
import { voucher } from "../../data/voucher";
// import { voucher } from "../../data/voucher";

const initialState = {
  value: [],
  tab: "default",
  customer: "",
  voucher: [],
  isVoucher: {
    isTrue: false,
    voucher_name: "",
    value: [],
  },
  subTotal: 0,
  qty: 0,
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setValueEmpty: (state) => {
      state.value = [];
    },
    addToReceipt: (state, action) => {
      const itemIndex = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.value[itemIndex].qty += 1;
      } else {
        const tempitem = { ...action.payload, qty: action.payload.qty };
        state.value.push(tempitem);
      }
      // const tempMenu = { ...action.payload };
      // state.value.push(tempMenu);
    },
    removeReceiptItem: (state, action) => {
      // get id from state value
      const itemIndex = state.value.findIndex(
        (index) => index.id === action.payload.id
      );
      if (itemIndex >= 0) {
        if (state.value[itemIndex].qty > 1) {
          state.value[itemIndex].qty -= 1;
        } else if (state.value[itemIndex].qty === 1) {
          state.value.splice(itemIndex, 1);
        }
      }
    },
    getSubtotal: (state, action) => {
      // get subtotal from state value
      let { subtotal, quantity } = state.value.reduce(
        (cartSubtotal, cartItem) => {
          const { price, qty } = cartItem;
          const itemTotal = Number(price) * Number(qty);

          cartSubtotal.subtotal += itemTotal;
          cartSubtotal.quantity += Number(qty);

          return cartSubtotal;
        },
        {
          subtotal: 0,
          qty: 0,
        }
      );
      state.subTotal = subtotal;
      state.qty = quantity;
    },
    setVoucher: (state, action) => {
      state.voucher = action.payload;
    },
    getVoucher: (state, action) => {
      // get voucher from state voucher
      const voucher = state.voucher.find(
        (v) => v.voucher_code === action.payload
      );
      if (voucher) {
        state.isVoucher.isTrue = true;
        state.isVoucher.value = voucher;
        state.isVoucher.voucher_name = voucher.voucher_name;
      }
    },
    clearVoucher: (state) => {
      state.isVoucher.isTrue = false;
      state.isVoucher.value = {
        ...voucher,
        isTrue: false,
        voucher_name: "",
        value: [],
      };
    },
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const {
  addToReceipt,
  removeReceiptItem,
  getSubtotal,
  getVoucher,
  changeTab,
  setValueEmpty,
  setCustomer,
  setVoucher,
  clearVoucher,
} = receiptSlice.actions;

export default receiptSlice.reducer;
