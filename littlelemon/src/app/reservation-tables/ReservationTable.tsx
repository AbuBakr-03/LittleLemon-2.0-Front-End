import { useListBookingsPrivate } from "@/hooks/useBooking";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ReservationTable = () => {
  const listBookings = useListBookingsPrivate();
  return (
    <div className="container mx-auto rounded-xl border-1 px-5 py-5">
      <h1 className="pb-4 text-2xl font-semibold">Bookings</h1>
      <DataTable columns={columns} data={listBookings.data ?? []} />
    </div>
  );
};

export default ReservationTable;
