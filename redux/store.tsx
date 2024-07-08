import { configureStore } from "@reduxjs/toolkit";
import pickupSlice from "./slices/pickupSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    pickup: pickupSlice,
    cart: cartSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
