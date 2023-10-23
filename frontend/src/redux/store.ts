import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import loadingRedux from "./loadingRedux";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingRedux,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type IState = ReturnType<typeof rootReducer>;
