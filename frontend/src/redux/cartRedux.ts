import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProps } from "./type";
import { ProductProps } from "../pages/Admin/type";

const initialCartState: CartProps = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
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
    removeItem: (state, action: PayloadAction<string>) => {
      const productIdToRemove = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item._id === productIdToRemove
      );

      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        state.quantityCart -= removedItem.quantityCart;
        state.totalPrice -= removedItem.totalPrice;
        state.items.splice(itemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseQuantity: (state, action: PayloadAction<ProductProps>) => {
      const newItem = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      );

      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantityCart > 1) {
          state.items[itemIndex].quantityCart -= 1;
          state.items[itemIndex].totalPrice -= newItem.price;
          state.quantityCart -= 1;
          state.totalPrice -= newItem.price;
        } else if (state.items[itemIndex].quantityCart === 1) {
          state.items[itemIndex].quantityCart -= 1;
          state.totalPrice -= newItem.price;
          state.quantityCart -= 1;
          state.items.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { addItem, removeItem, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
