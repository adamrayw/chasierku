import { configureStore } from "@reduxjs/toolkit";
import addToReceiptReducer from "../features/receipt/addSlice";

export const store = configureStore({
  reducer: {
    receipt: addToReceiptReducer,
  },
});
