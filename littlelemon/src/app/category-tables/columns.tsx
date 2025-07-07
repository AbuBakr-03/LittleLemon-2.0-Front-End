"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Actionscell from "./actioncell";
import { type category_type } from "@/apis/categoryapis";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<category_type>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Category Name" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) =>
      //{ row }
      {
        return <Actionscell item={row.original}></Actionscell>;
      },
  },
];
