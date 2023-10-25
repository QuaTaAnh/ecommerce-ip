import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    registerSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    editProfile: (state, action: PayloadAction<UserProps>) => {
      state.user = { ...state.user, user: { ...action.payload } };
    },
    loginEnd: (state) => {
      state.user = {};
    },
  },
});

export const { registerSuccess, loginSuccess, editProfile, loginEnd } =
  userSlice.actions;
export default userSlice.reducer;
