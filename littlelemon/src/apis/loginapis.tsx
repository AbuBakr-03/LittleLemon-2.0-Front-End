import axios from "axios";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestschema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

const responseschema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type request = z.infer<typeof requestschema>;
export type response = z.infer<typeof responseschema>;

const BASE_URL = "http://127.0.0.1:8006/auth/jwt/create/";

export const login = async (details: request): Promise<response> => {
  try {
    const { data } = await axios.post(BASE_URL, details);
    const result = responseschema.safeParse(data);
    if (result.success) {
      console.log(result.data);
      return result.data;
    } else {
      console.error(result.error);
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
