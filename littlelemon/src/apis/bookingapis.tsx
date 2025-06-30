import axios from "axios";
import z from "zod";
const BASE_URL = "http://127.0.0.1:8006/api/booking/";
const request_schema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().min(1),
  date: z.coerce.date(),
  time: z.string(),
  comment: z.string(),
  number_of_guests: z.enum(["1", "2", "3", "4", "5", "6"]),
  seating: z.enum(["Indoor", "Outdoor", "No Preference"]),
});
const request_schema_array = z.array(request_schema);
export type request = z.infer<typeof request_schema>;
export type post = Omit<request, "id">;
export const listBookings = async (date?: Date): Promise<request[]> => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: date ? { date: date.toISOString().split("T")[0] } : {},
    });
    const result = request_schema_array.safeParse(data);
    if (result.success) {
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
export const createBooking = async (booking: post): Promise<request> => {
  try {
    const { data } = await axios.post(BASE_URL, booking);
    const result = request_schema.safeParse(data);
    if (result.success) {
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
export const retrieveBooking = async (id: number): Promise<request> => {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}`);
    const result = request_schema.safeParse(data);
    if (result.success) {
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
export const updateBooking = async (booking: request): Promise<request> => {
  try {
    const { data } = await axios.put(`${BASE_URL}${booking.id}`, booking);
    const result = request_schema.safeParse(data);
    if (result.success) {
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
export const deleteBooking = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
