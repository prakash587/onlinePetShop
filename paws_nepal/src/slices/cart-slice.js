import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  totalItemCount: 0,
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const itemToUpdate = state.items.find(
        (theItem) =>
          theItem.productItem.id === action.payload.item.productItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.count += 1;
        itemToUpdate.price += action.payload.item.productItem.price;
        state.totalItemCount += 1;
        state.totalPrice += action.payload.item.productItem.price;
      } else {
        state.items.push(action.payload.item);
        state.totalItemCount += 1;
        state.totalPrice += action.payload.item.productItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const itemToUpdate = state.items.find(
        (theItem) =>
          theItem.productItem.id === action.payload.item.productItem.id
      );
      if (itemToUpdate) {
        if (itemToUpdate.count === 1) {
          let newStateItems = state.items.filter(
            (item) => item.productItem.id !== itemToUpdate.productItem.id
          );

          state.items = newStateItems;
        }
        itemToUpdate.count -= 1;
        itemToUpdate.price -= action.payload.item.productItem.price;
        state.totalItemCount -= 1;
        state.totalPrice -= action.payload.item.productItem.price;
      } else {
        state.totalItemCount -= 1;
        state.totalPrice -= action.payload.item.productItem.price;
      }
    },
    clearCart(state, action) {
      state = {
        items: [],
        totalItemCount: 0,
        totalPrice: 0,
      };
    },
  },
});

export default cartSlice;

export const cartSliceActions = cartSlice.actions;
