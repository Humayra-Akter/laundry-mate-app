// redux/DateReducer.tsx
import { createSlice } from "@reduxjs/toolkit";

export const DateSlice = createSlice({
  name: "date",
  initialState: {
    selectedDate: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearPickupDate(state) {
      state.selectedDate = null;
    },
  },
});

export const { setSelectedDate, clearPickupDate } = DateSlice.actions;

export default DateSlice.reducer;
