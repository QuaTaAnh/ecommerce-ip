import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserProps } from "./type";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    accessToken: "",
  },
  reducers: {
    registerSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    editProfile: (state, action: PayloadAction<IUser>) => {
      state.user = { ...state.user, ...action.payload };
    },
    loginEnd: (state) => {
      state.user = {};
    },
  },
});

export const { registerSuccess, loginSuccess, editProfile, loginEnd } =
  userSlice.actions;
export default userSlice.reducer;
