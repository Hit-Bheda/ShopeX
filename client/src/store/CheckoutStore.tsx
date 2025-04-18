import { z } from "zod";
import { create } from "zustand";
import { ShippingAddressSchema } from "../schemas";

type ShippingAddressType = z.infer<typeof ShippingAddressSchema>;

type Store = {
  name: string;
  setName: (name: string) => void;

  shippingAddress: ShippingAddressType;
  setShippingAddress: (data: ShippingAddressType) => void;
};

export const useAuthStore = create<Store>((set) => ({
  name: "",
  setName: (name) => set({ name }),
  shippingAddress: {
    city: "",
    state: "",
    streetAddress: "",
    zipCode: "",
    streetAddress2: "",
    country: "",
    phone: "",
  },

  setShippingAddress: (data) => set({ shippingAddress: data }),
}));
