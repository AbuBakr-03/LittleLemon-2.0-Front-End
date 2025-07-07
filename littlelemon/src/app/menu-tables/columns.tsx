"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type menu_type } from "../../apis/menuapis";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { categories } from "./menuData";
import Actionscell from "./actioncell";

export const columns: ColumnDef<menu_type>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ getValue }) => {
      const price = getValue() as string;
      return `${price}`;
    },
  },
  {
    accessorKey: "inventory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as {
        id: number;
        category_name: string;
      };
      const categoryData = categories.find(
        (cat) => cat.value === category.id.toString(),
      );

      if (!categoryData) {
        return null;
      }

      return (
        <div className="flex items-center justify-center">
          {categoryData.icon && (
            <categoryData.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{categoryData.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const category = row.getValue(id) as {
        id: number;
        category_name: string;
      };
      return value.includes(category.id.toString());
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Actionscell item={row.original} />;
    },
  },
];
