import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

export const getProducts = async (category: string, limit: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/products?category=${category}&limit=${limit}`,
    );
    console.log("Data: ", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHeroProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/hero-products`);
    console.log(res.data.products);
    return res.data.products;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
    return res.data.product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHomeCategory = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/products/home-category`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    console.error(error);
  }
};
