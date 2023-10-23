import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startLoading: (state) => {
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stopLoading: (state) => {
      return false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
