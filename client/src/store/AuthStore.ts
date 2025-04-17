import { z } from "zod";
import { create } from "zustand";
import { CartSchema } from "../schemas";

type CartItem = z.infer<typeof CartSchema>;

type Store = {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
  cart: CartItem[];
  setCart: (data: CartItem) => void;
  setCartFromLocal: (cart: CartItem[]) => void;
  updateCartItem: (data: CartItem) => void; // <- NEW
  removeFromCart: (productId: string, size: string) => void; // <- NEW
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
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].productQuantity += data.productQuantity;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, data] };
      }
    }),

  setCartFromLocal: (cart) => set({ cart }),

  updateCartItem: (data) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.productId === data.productId &&
        item.productSize === data.productSize
          ? data
          : item,
      );
      return { cart: updatedCart };
    }),

  removeFromCart: (productId, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.productId === productId && item.productSize === size),
      ),
    })),
}));
