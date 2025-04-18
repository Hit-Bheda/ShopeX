import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartSchema } from "../schemas";

type CartItem = z.infer<typeof CartSchema>;

type Store = {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
  cart: CartItem[];
  setCart: (data: CartItem) => void;
  updateCartItem: (data: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
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
          }
          return { cart: [...state.cart, data] };
        }),

      updateCartItem: (data) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === data.productId &&
            item.productSize === data.productSize
              ? data
              : item,
          ),
        })),

      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(item.productId === productId && item.productSize === size),
          ),
        })),
    }),
    {
      name: "cart-storage", // Unique name for localStorage key
      partialize: (state) => ({ cart: state.cart }), // Only persist the cart
      migrate: (persistedState) => {
        if (!persistedState) return null;
        // Add migration logic if needed when store structure changes
        return persistedState as Store;
      },
    },
  ),
);
