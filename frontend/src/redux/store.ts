import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import loadingRedux from "./loadingRedux";
import cartRedux from "./cartRedux";
import request from "../utils/request";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingRedux,
  cart: cartRedux,
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  const { user } = store.getState();
  if (user?.token) {
    request.defaults.headers.common["Authorization"] = `${user.token}`;
  } else {
    delete request.defaults.headers.common["Authorization"];
  }
});

export type IState = ReturnType<typeof rootReducer>;
