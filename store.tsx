// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import DateReducer from "./redux/DateReducer";

export default configureStore({
  reducer: {
    cart: CartReducer,
    date: DateReducer,
  },
});
