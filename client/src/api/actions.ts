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
