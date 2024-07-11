// redux/CartReducer.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./types";

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.ItemName === action.payload.ItemName
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.ItemName !== action.payload
      );
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      // implement increment logic if needed
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      // implement decrement logic if needed
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;
