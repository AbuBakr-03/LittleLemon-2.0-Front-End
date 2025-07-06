import { useListBookings } from "@/hooks/useBooking";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ReservationTable = () => {
  const listBookings = useListBookings();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={listBookings.data ?? []} />
    </div>
  );
};

export default ReservationTable;
