import {
  createBooking,
  deleteBooking,
  listBookings,
  retrieveBooking,
  updateBooking,
  type post,
  type request,
} from "@/apis/bookingapis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListBookings = (date?: Date) => {
  return useQuery<request[], Error>({
    queryKey: ["bookings", date?.toISOString().split("T")[0]],
    queryFn: () => listBookings(date),
  });
};
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<request, Error, post>({
    mutationFn: (booking) => createBooking(booking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};
export const useRetrieveBooking = (id: number) => {
  return useQuery({
    queryKey: ["Booking", id],
    queryFn: () => retrieveBooking(id),
    enabled: !!id,
  });
};
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<request, Error, request>({
    mutationFn: (booking) => updateBooking(booking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};
export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
};
