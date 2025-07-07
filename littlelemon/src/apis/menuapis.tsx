import axios from "axios";
import { z } from "zod";

const BASE_URL = "http://127.0.0.1:8000/api/menu/";

// Schema for category (nested in menu response)
const category_schema = z.object({
  id: z.number(),
  category_name: z.string(),
});

// Schema for menu item
const menu_schema = z.object({
  id: z.number(),
  title: z.string().min(1),
  logo: z.string().url(), // Image URL from Django
  description: z.string(),
  price: z.string(), // Django DecimalField comes as string
  inventory: z.number().int().min(0),
  category: category_schema,
  category_id: z.number(), // For write operations
});

// Schema for creating/updating menu (without id and category object)
const menu_post_schema = z.object({
  title: z.string().min(1),
  logo: z.any(), // File upload - can be File object or string URL
  description: z.string(),
  price: z.string(),
  inventory: z.number().int().min(0),
  category_id: z.number(),
});

// Schema for updating existing menu (includes id)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const menu_update_schema = menu_post_schema.extend({
  id: z.number(),
});

const menu_array_schema = z.array(menu_schema);

export type menu_type = z.infer<typeof menu_schema>;
export type menu_post_type = z.infer<typeof menu_post_schema>;
export type menu_update_type = z.infer<typeof menu_update_schema>;
export type category_type = z.infer<typeof category_schema>;

// List all menu items
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

// Create new menu item
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

    // Handle logo upload
    if (menuData.logo instanceof File) {
      formData.append("logo", menuData.logo);
    } else if (typeof menuData.logo === "string") {
      // If it's a URL string, you might want to handle this differently
      // For now, we'll skip adding it to formData
      console.warn("Logo is a string URL, not a file upload");
    }

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
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Create menu item error:", error);
    throw error;
  }
};

// Retrieve single menu item
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

// Update menu item
export const updateMenuItem = async (
  menuData: menu_update_type,
): Promise<menu_type> => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", menuData.title);
    formData.append("description", menuData.description);
    formData.append("price", menuData.price);
    formData.append("inventory", menuData.inventory.toString());
    formData.append("category_id", menuData.category_id.toString());

    // Handle logo upload - only append if it's a new file
    if (menuData.logo instanceof File) {
      formData.append("logo", menuData.logo);
    }
    // If logo is a string (existing URL), don't append it

    const { data } = await axios.put(`${BASE_URL}${menuData.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

// Delete menu item
export const deleteMenuItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Delete menu item error:", error);
    throw error;
  }
};

// Helper function to convert File to base64 for preview
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
