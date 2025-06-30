import { DataTable } from "@/components/data-table";
import data from "../../app/dashboard/data.json";
const Booking = () => {
  return (
    <>
      <DataTable data={data} />
    </>
  );
};
export default Booking;
