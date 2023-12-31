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
import { toast } from "react-toastify";

export const register = async (dispatch: Dispatch<any>, user: IUser) => {
  dispatch(startLoading());
  try {
    const res = await request.post("/api/auth/register", user);
    dispatch(registerSuccess(res.data));
    return res;
  } catch (error) {
    return "error";
  } finally {
    dispatch(stopLoading());
  }
};

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

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(loginEnd());
};

export const editUser = async (dispatch: Dispatch<any>, user: any) => {
  dispatch(startLoading());
  try {
    const { data } = await request.put("/api/auth/profile", user);
    if (data?.error) {
      toast.error(data?.error);
    } else {
      dispatch(editProfile(data?.updatedUser));
    }
    return data;
  } catch (error) {
    return "error";
  } finally {
    dispatch(stopLoading());
  }
};
