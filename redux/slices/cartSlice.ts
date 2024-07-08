import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  ItemName: string;
  count: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.count;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.ItemName === action.payload
      );
      if (index !== -1) {
        state.totalPrice -= state.items[index].price * state.items[index].count;
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
