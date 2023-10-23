import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./type";

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
    editUser: (state, action: PayloadAction<UserProps>) => {
      state.user = { ...state.user, ...action.payload };
    },
    loginEnd: (state) => {
      state.user = {};
    },
  },
});

export const { registerSuccess, loginSuccess, editUser, loginEnd } =
  userSlice.actions;
export default userSlice.reducer;
