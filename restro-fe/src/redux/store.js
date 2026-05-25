import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
