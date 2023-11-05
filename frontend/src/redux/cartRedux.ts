import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "./type";
import { ProductProps } from "../pages/Admin/type";

const initialCartState: CartProps = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      items: [],
      totalPrice: 0,
      quantityCart: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductProps>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantityCart += 1;
        existingItem.totalPrice += existingItem.price;
      } else {
        newItem.quantityCart = 1;
        newItem.totalPrice = newItem.price;
        state.items.push(newItem);
      }
      state.quantityCart += 1;
      state.totalPrice += newItem.price;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
