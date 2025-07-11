import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

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

import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";

import { type menu_type } from "@/apis/menuapis";
import {
  useUpdateMenuItemPrivate,
  useDeleteMenuItemPrivate,
} from "@/hooks/useMenu";
import { useListCategoriesPrivate } from "@/hooks/useCategory";
import { toast } from "sonner";

const Actionscell = ({ item }: { item: menu_type }) => {
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
    setDropdownOpen(false);
    setTimeout(() => {
      setDrawerOpen(true);
    }, 100);
  };

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 100);
  };

  const handleDrawerClose = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      setTimeout(() => {
        document.body.focus();
      }, 100);
    }
  };

  const schema = z.object({
    id: z.number(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    inventory: z.number().min(0, "Inventory must be 0 or greater"),
    category: z.object({
      id: z.number(),
      category_name: z.string(),
    }),
    logo: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      inventory: item.inventory,
      category: item.category,
      logo: item.logo,
    },
  });

  const updateMenuItem = useUpdateMenuItemPrivate();
  const deleteMenuItem = useDeleteMenuItemPrivate();
  const { data: categories } = useListCategoriesPrivate();

  const onSubmit = (data: FormData) => {
    console.log("Submitting menu update:", data);
    updateMenuItem.mutate(data, {
      onSuccess: () => {
        setDrawerOpen(false);
        console.log("Menu item updated successfully");
        toast.success("Menu item updated successfully");
      },
      onError: (error) => {
        console.error("Error updating menu item:", error);
        toast.error("Error updating menu item");
      },
    });
  };

  const handleDeleteConfirm = () => {
    deleteMenuItem.mutate(item.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        console.log(`Menu item "${item.title}" deleted successfully`);
        toast.success(`Menu item "${item.title}" deleted successfully`);
      },
      onError: (error) => {
        console.error("Error deleting menu item:", error);
        toast.error(`Error deleting menu item`);
      },
    });
  };

  const categoryOptions = categories?.map((category) => (
    <SelectItem key={category.id} value={category.id.toString()}>
      {category.category_name}
    </SelectItem>
  ));

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
              Are you sure you want to delete this menu item?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{item.title}" from your menu. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMenuItem.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteMenuItem.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleteMenuItem.isPending ? "Deleting..." : "Delete Menu Item"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerClose}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent className={isMobile ? "min-h-[92.5vh]" : ""}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DrawerHeader className="flex-shrink-0 gap-1">
                <DrawerTitle>{item.title}</DrawerTitle>
                <DrawerDescription>
                  Edit Menu Item Information
                </DrawerDescription>
              </DrawerHeader>
              <div
                className={`flex flex-col gap-4 overflow-y-auto px-4 text-sm ${
                  isMobile
                    ? "max-h-[calc(90vh-200px)] min-h-0 flex-1 pb-4"
                    : "flex-1 overflow-y-auto"
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded"
                            placeholder="Menu item title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded"
                            placeholder="12.99"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inventory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inventory</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="rounded"
                            placeholder="50"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedCategory = categories?.find(
                              (cat) => cat.id.toString() === value,
                            );
                            if (selectedCategory) {
                              field.onChange({
                                id: selectedCategory.id,
                                category_name: selectedCategory.category_name,
                              });
                            }
                          }}
                          value={field.value?.id?.toString()}
                        >
                          <FormControl className="w-full rounded">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>{categoryOptions}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl className="rounded">
                          <Textarea
                            placeholder="Menu item description"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DrawerFooter className="flex-shrink-0 pt-4">
                <Button type="submit" disabled={updateMenuItem.isPending}>
                  {updateMenuItem.isPending ? "Updating..." : "Update"}
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
