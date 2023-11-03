import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import loadingRedux from "./loadingRedux";
import cartRedux from "./cartRedux";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingRedux,
  cart: cartRedux,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type IState = ReturnType<typeof rootReducer>;
