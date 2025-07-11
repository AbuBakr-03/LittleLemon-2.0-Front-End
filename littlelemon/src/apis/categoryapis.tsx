/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { z } from "zod";

const BASE_URL = "http://127.0.0.1:8000/api/category/";

const category_schema = z.object({
  id: z.number(),
  category_name: z.string().min(1),
});

const category_array_schema = z.array(category_schema);
export type category_type = z.infer<typeof category_schema>;
export type category_post_type = Omit<category_type, "id">;

// Public functions (no auth required)
export const listCategories = async (): Promise<category_type[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}`);
    const result = category_array_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Private functions (require auth)
export const listCategoriesPrivate = async (
  axiosPrivate: any,
): Promise<category_type[]> => {
  try {
    const { data } = await axiosPrivate.get("category/");
    const result = category_array_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategoryPrivate = async (
  axiosPrivate: any,
  cat_data: category_post_type,
): Promise<category_type> => {
  try {
    const { data } = await axiosPrivate.post("category/", cat_data);
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategoryPrivate = async (
  axiosPrivate: any,
  cat_data: category_type,
): Promise<category_type> => {
  try {
    const { data } = await axiosPrivate.put(
      `category/${cat_data.id}/`,
      cat_data,
    );
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveCategoryPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<category_type> => {
  try {
    const { data } = await axiosPrivate.get(`category/${id}/`);
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategoryPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<void> => {
  try {
    await axiosPrivate.delete(`category/${id}/`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Legacy functions for backward compatibility (keeping for public use)
export const createCategory = async (
  cat_data: category_post_type,
): Promise<category_type> => {
  try {
    const { data } = await axios.post(`${BASE_URL}`, cat_data);
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = async (
  cat_data: category_type,
): Promise<category_type> => {
  try {
    const { data } = await axios.put(`${BASE_URL}${cat_data.id}/`, cat_data);
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const retrieveCategory = async (id: number): Promise<category_type> => {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}/`);
    const result = category_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error(result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
