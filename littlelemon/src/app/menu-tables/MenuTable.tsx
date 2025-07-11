import { useListMenuItemsPrivate } from "@/hooks/useMenu";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const MenuTable = () => {
  const listMenuItems = useListMenuItemsPrivate();
  return (
    <div className="container mx-auto rounded-xl border-1 px-5 py-5">
      <h1 className="pb-4 text-2xl font-semibold">Menu Items</h1>
      <DataTable columns={columns} data={listMenuItems.data ?? []} />
    </div>
  );
};

export default MenuTable;
