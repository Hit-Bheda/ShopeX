import { z } from "zod";
import { create } from "zustand";
import { CartSchema } from "../schemas";

type CartItem = z.infer<typeof CartSchema>;

type Store = {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
  cart: CartItem[];
  setCart: (data: CartItem) => void;
  setCartFromLocal: (cart: CartItem[]) => void; // <- new function
};

export const useAuthStore = create<Store>((set) => ({
  isAuth: false,
  setIsAuth: (auth) => set({ isAuth: auth }),
  cart: [],
  setCart: (data) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.productId === data.productId &&
          item.productSize === data.productSize,
      );

      if (existingIndex !== -1) {
        // Product with same ID and Size exists – increment quantity
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].productQuantity += data.productQuantity;
        return { cart: updatedCart };
      } else {
        // Product with different size – add as new item
        return { cart: [...state.cart, data] };
      }
    }),
  setCartFromLocal: (cart) => set({ cart }), // <- to load cart from localStorage
}));
