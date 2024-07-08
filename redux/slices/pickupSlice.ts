import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PickupState {
  selectedDate: string | null;
}

const initialState: PickupState = {
  selectedDate: null,
};

const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    setPickupDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setPickupDate } = pickupSlice.actions;
export default pickupSlice.reducer;
