"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type request } from "../../apis/bookingapis";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { guests, seatings } from "./reservationData";
import Actionscell from "./actioncell";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<request>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date.toISOString().split("T")[0];
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
  },
  {
    accessorKey: "seating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seating" />
    ),
    cell: ({ row }) => {
      const seating = seatings.find(
        (seating) => seating.value === row.getValue("seating"),
      );

      if (!seating) {
        return null;
      }

      return (
        <div className="flex items-center justify-center">
          {seating.icon && (
            <seating.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{seating.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "number_of_guests",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guests" />
    ),
    cell: ({ row }) => {
      const guest = guests.find(
        (guest) => guest.value === row.getValue("number_of_guests"),
      );

      if (!guest) {
        return null;
      }

      return (
        <div className="flex items-center justify-center">
          {guest.icon && (
            <guest.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{guest.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
