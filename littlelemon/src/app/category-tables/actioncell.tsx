import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { type category_type } from "@/apis/categoryapis";
import {
  useUpdateCategoryPrivate,
  useDeleteCategoryPrivate,
} from "@/hooks/useCategory";
import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";

const Actionscell = ({ item }: { item: category_type }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth < 600);

  const checksize = () => {
    setMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", checksize);
    return () => {
      window.removeEventListener("resize", checksize);
    };
  }, []);

  const handleUpdateClick = () => {
    setDropdownOpen(false); // Close dropdown first
    // Small delay to ensure dropdown closes before opening drawer
    setTimeout(() => {
      setDrawerOpen(true);
    }, 100);
  };

  const handleDeleteClick = () => {
    setDropdownOpen(false); // Close dropdown first
    // Small delay to ensure dropdown closes before opening dialog
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  };

  const handleDrawerClose = (open: boolean) => {
    setDrawerOpen(open);
    // Ensure focus is properly restored when drawer closes
    if (!open) {
      // Force focus back to document body or a safe element
      setTimeout(() => {
        document.body.focus();
      }, 100);
    }
  };

  const schema = z.object({
    id: z.number(),
    category_name: z.string().min(1),
  });
  type request = z.infer<typeof schema>;
  const form = useForm<request>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: item.id,
      category_name: item.category_name,
    },
  });

  const updateCategory = useUpdateCategoryPrivate();
  const deleteCategory = useDeleteCategoryPrivate();

  const onSubmit = (data: request) => {
    console.log(data);
    updateCategory.mutate(data, {
      onSuccess: () => {
        toast.success(`Category ${data.category_name} updated successfully`);
      },
      onError: () => {
        toast.error(`Error updating category`);
      },
    });
  };

  const handleDeleteConfirm = () => {
    deleteCategory.mutate(item.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        console.log(`Category ${item.category_name} deleted successfully`);
        toast.success(`Category ${item.category_name} deleted successfully`);
      },
      onError: (error) => {
        console.error("Error deleting category:", error);
        toast.error(`Error deleting category`);
        // You could add a toast notification here for error handling
      },
    });
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleUpdateClick}>
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-red-600 focus:bg-red-100 focus:text-red-600 dark:focus:bg-red-900/20"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category for{" "}
              <strong>{item.category_name}</strong>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteCategory.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteCategory.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleteCategory.isPending ? "Deleting..." : "Delete Category"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerClose}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent className={isMobile ? "min-h-[92.5vh]" : ""}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DrawerHeader className="flex-shrink-0 gap-1">
                <DrawerTitle>{item.category_name}</DrawerTitle>
                <DrawerDescription>Edit Information</DrawerDescription>
              </DrawerHeader>
              <div
                className={`flex flex-col gap-4 overflow-y-auto px-4 text-sm ${
                  isMobile
                    ? "max-h-[calc(90vh-200px)] min-h-0 flex-1 pb-4"
                    : "flex-1 overflow-y-auto"
                } `}
              >
                {" "}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category_name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={item.category_name}
                            className="rounded"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
              <DrawerFooter className="flex-shrink-0 pt-4">
                <Button type="submit" onClick={() => setDrawerOpen(false)}>
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Actionscell;
