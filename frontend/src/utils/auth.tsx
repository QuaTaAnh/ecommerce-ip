import { Dispatch } from "@reduxjs/toolkit";
import { loginEnd, loginSuccess, registerSuccess } from "../redux/userRedux";
import { request } from "./request";
import { IUser } from "../redux/type";

export const register = async (dispatch: Dispatch<any>, user: IUser) => {
  try {
    const res = await request.post("/api/auth/register", user);
    dispatch(registerSuccess(res.data));
    return res;
  } catch (error) {
    return "error";
  }
};

export const login = async (dispatch: Dispatch<any>, user: IUser) => {
  try {
    const res = await request.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (error) {
    return "error";
  }
};

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(loginEnd());
};
