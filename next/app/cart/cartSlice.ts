import { createSlice } from "@reduxjs/toolkit";

const getInitialCartId = () => localStorage.getItem("cartId");

export const cartSlice = createSlice({
  name: "cartId",
  initialState: {
    cartId: getInitialCartId(),
  },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
      localStorage.setItem("cartId", action.payload);
    },
    removeCartId: (state) => {
      state.cartId = null;
      localStorage.removeItem("cartId");
    },
  },
});

export const { setCartId, removeCartId } = cartSlice.actions;
