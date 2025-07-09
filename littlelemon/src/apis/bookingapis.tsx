/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import z from "zod";

const BASE_URL = "http://127.0.0.1:8000/api/booking/";

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

// Helper function to format date for Django
const formatDateForDjango = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

// Helper function to format data for backend
const formatBookingData = (booking: post) => {
  return {
    ...booking,
    date: formatDateForDjango(booking.date),
    comment: booking.comment || "No Comment",
  };
};

// Regular axios for public endpoints (listing bookings for reservation form)
export const listBookings = async (date?: Date): Promise<request[]> => {
  try {
    const params = date ? { date: formatDateForDjango(date) } : {};
    const { data } = await axios.get(BASE_URL, { params });
    const result = request_schema_array.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("List bookings error:", error);
    throw error;
  }
};

// Private axios functions for authenticated endpoints
export const listBookingsPrivate = async (
  axiosPrivate: any,
  date?: Date,
): Promise<request[]> => {
  try {
    const params = date ? { date: formatDateForDjango(date) } : {};
    const { data } = await axiosPrivate.get("booking/", { params });
    const result = request_schema_array.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("List bookings error:", error);
    throw error;
  }
};

export const createBooking = async (booking: post): Promise<request> => {
  try {
    const formattedBooking = formatBookingData(booking);
    console.log("Sending to backend:", formattedBooking);
    const { data } = await axios.post(BASE_URL, formattedBooking);
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

export const createBookingPrivate = async (
  axiosPrivate: any,
  booking: post,
): Promise<request> => {
  try {
    const formattedBooking = formatBookingData(booking);
    console.log("Sending to backend:", formattedBooking);
    const { data } = await axiosPrivate.post("booking/", formattedBooking);
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Create booking error:", error);
    throw error;
  }
};

export const retrieveBookingPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<request> => {
  try {
    const { data } = await axiosPrivate.get(`booking/${id}/`);
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Retrieve booking error:", error);
    throw error;
  }
};

export const updateBookingPrivate = async (
  axiosPrivate: any,
  booking: request,
): Promise<request> => {
  try {
    const formattedBooking = {
      ...booking,
      date: formatDateForDjango(booking.date),
    };
    const { data } = await axiosPrivate.put(
      `booking/${booking.id}/`,
      formattedBooking,
    );
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Update booking error:", error);
    throw error;
  }
};

export const deleteBookingPrivate = async (
  axiosPrivate: any,
  id: number,
): Promise<void> => {
  try {
    await axiosPrivate.delete(`booking/${id}/`);
  } catch (error) {
    console.error("Delete booking error:", error);
    throw error;
  }
};

// Legacy functions for backward compatibility (still used by public reservation form)
export const retrieveBooking = async (id: number): Promise<request> => {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}/`);
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Retrieve booking error:", error);
    throw error;
  }
};

export const updateBooking = async (booking: request): Promise<request> => {
  try {
    const formattedBooking = {
      ...booking,
      date: formatDateForDjango(booking.date),
    };
    const { data } = await axios.put(
      `${BASE_URL}${booking.id}/`,
      formattedBooking,
    );
    const result = request_schema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error:", result.error);
      throw new Error("Failed to validate response data");
    }
  } catch (error) {
    console.error("Update booking error:", error);
    throw error;
  }
};

export const deleteBooking = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Delete booking error:", error);
    throw error;
  }
};
