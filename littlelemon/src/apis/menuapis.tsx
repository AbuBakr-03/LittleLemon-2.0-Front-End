/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { z } from "zod";

const BASE_URL = "http://127.0.0.1:8000/api/menu/";

// Schema for category (nested in menu response)
const category_schema = z.object({
  id: z.number(),
  category_name: z.string(),
});

// Schema for menu item response
const menu_schema = z.object({
  id: z.number(),
  title: z.string(),
  logo: z.string(), // Image URL from Django
  description: z.string(),
  price: z.string(), // Django DecimalField comes as string
  inventory: z.number(),
  category: category_schema,
});

const menu_array_schema = z.array(menu_schema);

export type menu_type = z.infer<typeof menu_schema>;
export type menu_post_type = Omit<menu_type, "id" | "category"> & {
  category_id: number;
  logo: File; // For file upload
};

// Public functions (no auth required)
export const listMenuItems = async (): Promise<menu_type[]> => {
  try {
    const { data } = await axios.get(BASE_URL);
    const result = menu_array_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("List menu items error:", error);
    throw error;
  }
};

// Private functions (require auth)
export const listMenuItemsPrivate = async (
  axiosPrivate: any,
): Promise<menu_type[]> => {
  try {
    const { data } = await axiosPrivate.get("menu/");
    const result = menu_array_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("List menu items error:", error);
    throw error;
  }
};

export const createMenuItemPrivate = async (
  axiosPrivate: any,
  menuData: menu_post_type,
): Promise<menu_type> => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", menuData.title);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("inventory", menuData.inventory.toString());
    formData.append("category_id", menuData.category_id.toString());
    formData.append("logo", menuData.logo);

    const { data } = await axiosPrivate.post("menu/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      console.error("Response data:", data);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Create menu item error:", error);
    throw error;
  }
};

export const retrieveMenuItemPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<menu_type> => {
  try {
    const { data } = await axiosPrivate.get(`menu/${id}/`);
    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Retrieve menu item error:", error);
    throw error;
  }
};

export const updateMenuItemPrivate = async (
  axiosPrivate: any,
  menuData: menu_type,
): Promise<menu_type> => {
  try {
    const { data } = await axiosPrivate.patch(`menu/${menuData.id}/`, {
      title: menuData.title,
      description: menuData.description,
      price: menuData.price,
      inventory: menuData.inventory,
      category_id: menuData.category.id,
    });

    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Update menu item error:", error);
    throw error;
  }
};

export const deleteMenuItemPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<void> => {
  try {
    await axiosPrivate.delete(`menu/${id}/`);
  } catch (error) {
    console.error("Delete menu item error:", error);
    throw error;
  }
};

// Legacy functions for backward compatibility (keeping for public use)
export const createMenuItem = async (
  menuData: menu_post_type,
): Promise<menu_type> => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", menuData.title);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("inventory", menuData.inventory.toString());
    formData.append("category_id", menuData.category_id.toString());
    formData.append("logo", menuData.logo);

    const { data } = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      console.error("Response data:", data);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Create menu item error:", error);
    throw error;
  }
};

export const retrieveMenuItem = async (id: number): Promise<menu_type> => {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}/`);
    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Retrieve menu item error:", error);
    throw error;
  }
};

export const updateMenuItem = async (
  menuData: menu_type,
): Promise<menu_type> => {
  try {
    const { data } = await axios.patch(`${BASE_URL}${menuData.id}/`, {
      title: menuData.title,
      description: menuData.description,
      price: menuData.price,
      inventory: menuData.inventory,
      category_id: menuData.category.id,
    });

    const result = menu_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Update menu item error:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Delete menu item error:", error);
    throw error;
  }
};
