//redux/CartReducer.tsx
import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {},

    incrementQuantity: (state, action) => {},
    decrementQuantity: (state, action) => {},
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, cleanCart } =
  CartSlice.actions;

export default CartSlice.reducer;
