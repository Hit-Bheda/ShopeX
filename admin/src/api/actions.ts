import { EditProductSchema, ProductSchema } from "@/schemas";
import axios from "axios";
import { z } from "zod";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

export const createCategory = async (
  { name, description }: { name: string; description?: string | "" },
  accessToken: string,
) => {
  try {
    await axios.post(
      `${BASE_URL}/api/v1/admin/create-category`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error(String(error));
  }
};

export const getCategories = async (accessToken: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/get-categories`,
      null,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (id: string, accessToken: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/delete-category/${id}`,
      null,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (accessToken: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/admin/get-user`, null, {
      headers: {
        Authorization: accessToken,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadSingleFile = async (accessToken: string, image: File) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/image/upload`,
      { image, msg: "hello" },
      {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProduct = async (
  data: z.infer<typeof ProductSchema>,
  accessToken: string,
) => {
  try {
    await axios.post(`${BASE_URL}/api/v1/admin/create-product`, data, {
      headers: {
        Authorization: accessToken,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async (accessToken: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/get-products`,
      null,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: string, accessToken: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/delete-product/${id}`,
      null,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const setHeroProducts = async (
  accessToken: string,
  products: { product1: string; product2: string },
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/v1/admin/set-hero-products`,
      products,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    return res.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
    console.error(error);
  }
};

export const updateProduct = async (
  data: z.infer<typeof EditProductSchema>,
  accessToken: string,
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/update-product`,
      data,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
