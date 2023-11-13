import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./type";

const initialAuthState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth") || "{}")
  : {
      user: {},
      token: "",
    };

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    editProfile: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    loginEnd: (state) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const { registerSuccess, loginSuccess, editProfile, loginEnd } =
  userSlice.actions;
export default userSlice.reducer;
