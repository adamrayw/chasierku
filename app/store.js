import { configureStore } from "@reduxjs/toolkit";
import addToReceiptReducer from "../features/receipt/receiptSlice";

export const store = configureStore({
  reducer: {
    receipt: addToReceiptReducer,
  },
});
