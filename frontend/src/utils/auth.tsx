import { Dispatch } from "@reduxjs/toolkit";
import {
  editProfile,
  loginEnd,
  loginSuccess,
  registerSuccess,
} from "../redux/userRedux";
import request from "./request";
import { IUser } from "../redux/type";
import { startLoading, stopLoading } from "../redux/loadingRedux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const register = async (dispatch: Dispatch<any>, user: IUser) => {
  dispatch(startLoading());
  try {
    const res = await request.put("/api/auth/register", user);
    dispatch(registerSuccess(res.data));
    return res;
  } catch (error) {
    return "error";
  } finally {
    dispatch(stopLoading());
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (dispatch: Dispatch<any>, user: IUser) => {
  dispatch(startLoading());
  try {
    const res = await request.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (error) {
    return "error";
  } finally {
    dispatch(stopLoading());
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logout = (dispatch: Dispatch<any>) => {
  dispatch(loginEnd());
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editUser = async (dispatch: Dispatch<any>, user: any) => {
  dispatch(startLoading());
  try {
    const res = await request.put("/api/auth/edit-user", user);
    dispatch(editProfile(res.data));
    return res;
  } catch (error) {
    return "error";
  } finally {
    dispatch(stopLoading());
  }
};
