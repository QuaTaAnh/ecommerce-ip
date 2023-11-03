import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "./type";
import { ProductProps } from "../pages/Admin/type";

const initialState: CartProps = {
  items: [],
  totalPrice: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductProps>) => {
      const newItem = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingItem: any = state.items.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      } else {
        newItem.quantity = 1;
        newItem.totalPrice = newItem.price;
        state.items.push(newItem);
      }

      state.quantity += 1;
      state.totalPrice += newItem.price;
    },
    removeItem: (state, action: PayloadAction<ProductProps>) => {
      const itemToRemove = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingItem: any = state.items.find(
        (item) => item._id === itemToRemove._id
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item._id !== itemToRemove._id
          );
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }

        state.quantity -= 1;
        state.totalPrice -= itemToRemove.price;
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
