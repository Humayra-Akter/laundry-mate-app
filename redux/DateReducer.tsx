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
  },
});

export const { setSelectedDate } = DateSlice.actions;

export default DateSlice.reducer;
