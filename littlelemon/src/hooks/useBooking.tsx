// littlelemon/src/hooks/useBooking.tsx - Optimized Version
import {
  createBooking,
  createBookingPrivate,
  deleteBookingPrivate,
  listBookings,
  listBookingsPrivate,
  retrieveBooking,
  retrieveBookingPrivate,
  updateBookingPrivate,
  type post,
  type request,
} from "@/apis/bookingapis";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Public hook for reservation form (no auth required)
export const useListBookings = (date?: Date) => {
  return useQuery<request[], Error>({
    queryKey: ["bookings", date?.toISOString().split("T")[0]],
    queryFn: () => listBookings(date),
  });
};

// Private hook for dashboard (requires auth) - OPTIMIZED
export const useListBookingsPrivate = (date?: Date) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery<request[], Error>({
    queryKey: ["bookings-private", date?.toISOString().split("T")[0]],
    queryFn: () => {
      return listBookingsPrivate(axiosPrivate, date);
    },
    enabled: !!axiosPrivate, // Only run when axios instance exists
  });
};

// Public hook for reservation form
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<request, Error, post>({
    mutationFn: (booking) => createBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings-private"] });
    },
  });
};

// Private hook for dashboard
export const useCreateBookingPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<request, Error, post>({
    mutationFn: (booking) => createBookingPrivate(axiosPrivate, booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings-private"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

// Private hook for dashboard
export const useRetrieveBookingPrivate = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["booking-private", id],
    queryFn: () => retrieveBookingPrivate(axiosPrivate, id),
    enabled: !!id && !!axiosPrivate,
  });
};

// Private hook for dashboard
export const useUpdateBookingPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<request, Error, request>({
    mutationFn: (booking) => updateBookingPrivate(axiosPrivate, booking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings-private"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

// Private hook for dashboard
export const useDeleteBookingPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteBookingPrivate(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings-private"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

// Legacy hooks for backward compatibility (still used by public reservation form)
export const useRetrieveBooking = (id: number) => {
  return useQuery({
    queryKey: ["Booking", id],
    queryFn: () => retrieveBooking(id),
    enabled: !!id,
  });
};

export const useUpdateBooking = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<request, Error, request>({
    mutationFn: (booking) => updateBookingPrivate(axiosPrivate, booking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useDeleteBooking = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteBookingPrivate(axiosPrivate, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};
