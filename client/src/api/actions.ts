import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

export const getProducts = async (category?: string, limit?: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/products?category=${category}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};

export const getHeroProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/hero-products`);
    return res.data.products;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
    return res.data.product;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    }

    return null;
  }
};

export const getHomeCategory = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/home-category`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    }
    if (error instanceof Error) toast.error(error.message);
  }
};

export const getCartProducts = async (cartProducts: unknown) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/products/get-cart-products`,
      { cartProducts },
    );
    return res.data.products;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};
