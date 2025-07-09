"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type menu_type } from "../../apis/menuapis";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Actionscell from "./actioncell";

export const columns: ColumnDef<menu_type>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
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
      return `$${price}`;
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
      return <span>{category.category_name}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Actionscell item={row.original} />;
    },
  },
];
