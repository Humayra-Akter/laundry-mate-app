// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    name: string;
    email: string;
  } | null;
  history: any[];
}

const initialState: UserState = {
  userInfo: null,
  history: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.userInfo = action.payload;
    },
    addToHistory: (state, action: PayloadAction<any>) => {
      state.history.push(action.payload);
    },
  },
});

export const { setUserInfo, addToHistory } = userSlice.actions;
export default userSlice.reducer;
