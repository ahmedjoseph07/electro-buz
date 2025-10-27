"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// Simple localStorage subscription
if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      const cartItems = state.cart.items;
      localStorage.setItem("cart_v1", JSON.stringify(cartItems));
    } catch(error) {
      console.error(error)
    }
  });
}



// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;