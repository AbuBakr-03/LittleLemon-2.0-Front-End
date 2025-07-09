"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table-visibility";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useCreateCategory } from "@/hooks/useCategory";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // State for dialog open/close
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const schema = z.object({
    category_name: z.string().min(1, "Name is required"),
  });

  type post = z.infer<typeof schema>;

  const form = useForm<post>({
    resolver: zodResolver(schema),
    defaultValues: {
      category_name: "",
    },
  });

  const createCategory = useCreateCategory();

  const onSubmit = async (data: post) => {
    try {
      console.log("Submitting:", data);
      await createCategory.mutateAsync(data, {
        onSuccess: () => {
          toast.success(`Category ${data.category_name} created successfully`);
        },
        onError: () => {
          toast.error(`Error creating category`);
        },
      });

      // Reset form and close dialog on successful submission
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error - could show toast notification here
    }
  };

  // Reset form when dialog opens
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      // Reset form when opening dialog
      form.reset({
        category_name: "",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-1 flex-wrap items-center space-y-2 space-x-2 py-4">
        <Input
          placeholder="Filter names..."
          value={
            (table.getColumn("category_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("category_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableViewOptions table={table} />

        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button size={"sm"} className="h-8 place-self-start lg:flex">
              <Plus className="h-4 w-4" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[95vh] max-w-2xl overflow-y-auto md:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to your system.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                className="grid grid-cols-2 gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input className="rounded" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="col-span-1"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  className="col-span-1"
                  type="submit"
                  disabled={createCategory.isPending}
                >
                  {createCategory.isPending ? "Creating..." : "Create Category"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
