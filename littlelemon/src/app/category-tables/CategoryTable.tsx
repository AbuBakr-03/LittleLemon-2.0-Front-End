import { useListCategories } from "@/hooks/useCategory";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const CategoryTable = () => {
  const listCategories = useListCategories();
  return (
    <div className="container mx-auto rounded-xl border-1 px-5 py-5">
      <h1 className="pb-4 text-2xl font-semibold">Categories</h1>
      <DataTable columns={columns} data={listCategories.data ?? []} />
    </div>
  );
};

export default CategoryTable;
