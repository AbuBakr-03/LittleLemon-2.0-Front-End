import { useEffect, useState } from "react";
import { MoreHorizontal, CalendarIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";
import type { request } from "@/apis/bookingapis";
import {
  useListBookings,
  useUpdateBooking,
  useDeleteBooking,
} from "@/hooks/useBooking";

const Actionscell = ({ item }: { item: request }) => {
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
    name: z.string().min(1),
    email: z.string().email(),
    phone_number: z.string().min(1),
    date: z.coerce.date(),
    time: z.string(),
    comment: z.string(),
    number_of_guests: z.enum(["1", "2", "3", "4", "5", "6"]),
    seating: z.enum(["Indoor", "Outdoor", "No Preference"]),
  });
  type request = z.infer<typeof schema>;
  const form = useForm<request>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: item.id,
      name: item.name,
      email: item.email,
      phone_number: item.phone_number,
      comment: item.comment,
      date: item.date,
      time: item.time,
      number_of_guests: item.number_of_guests,
      seating: item.seating,
    },
  });

  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();

  const onSubmit = (data: request) => {
    console.log(data);
    updateBooking.mutate(data);
  };

  const handleDeleteConfirm = () => {
    deleteBooking.mutate(item.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        console.log(`Booking for ${item.name} deleted successfully`);
      },
      onError: (error) => {
        console.error("Error deleting booking:", error);
        // You could add a toast notification here for error handling
      },
    });
  };

  const observe_date = form.watch("date");
  const listBookings = useListBookings(observe_date || new Date());
  const bookedSlots = listBookings.data?.map((x) => x.time);
  const allSlots = ["19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00"];
  const availableSlots = allSlots.filter((time) => {
    return !bookedSlots?.includes(time);
  });
  const timeSlots = availableSlots.map((x, index) => {
    return (
      <SelectItem key={index} value={x}>
        {x}
      </SelectItem>
    );
  });

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
              Are you sure you want to delete this booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the booking for{" "}
              <strong>{item.name}</strong> on{" "}
              <strong>{new Date(item.date).toLocaleDateString()}</strong> at{" "}
              <strong>{item.time}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBooking.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteBooking.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleteBooking.isPending ? "Deleting..." : "Delete Booking"}
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
                <DrawerTitle>{item.name}</DrawerTitle>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={item.name}
                            className="rounded"
                            placeholder="John Doe"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={item.email}
                            className="rounded"
                            placeholder="john@example.com"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={item.phone_number}
                            className="rounded"
                            placeholder="(555) 123-4567"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="number_of_guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={item.number_of_guests}
                        >
                          <FormControl className="w-full rounded">
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5">5 People</SelectItem>
                            <SelectItem value="6">6 People</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover modal={false}>
                          <PopoverTrigger asChild>
                            <FormControl className="rounded">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            side="bottom"
                            sideOffset={8}
                            avoidCollisions={true}
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  // Fix timezone offset by setting to noon UTC
                                  const fixedDate = new Date(
                                    date.getTime() -
                                      date.getTimezoneOffset() * 60000,
                                  );
                                  field.onChange(fixedDate);
                                }
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={item.time}
                        >
                          <FormControl className="w-full rounded">
                            <SelectTrigger>
                              <SelectValue placeholder={item.time} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>{timeSlots}</SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seating"
                    render={({ field }) => (
                      <FormItem className="col-span-2 space-y-3">
                        <FormLabel>Seating Preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={item.seating}
                            className="grid grid-cols-2 place-content-center"
                          >
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="Indoor" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Indoor
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="Outdoor" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Outdoor (Weather Permitting)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <RadioGroupItem value="No Preference" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No Preference
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Comment</FormLabel>
                        <FormControl className="rounded">
                          <Textarea
                            defaultValue={item.comment}
                            placeholder=""
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
