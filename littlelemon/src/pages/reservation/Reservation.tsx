import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { useCreateBooking, useListBookings } from "@/hooks/useBooking";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

const Reservation: React.FC = () => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone_number: z.string().min(1),
    comment: z.string(),
    date: z.date(),
    time: z.string(),
    number_of_guests: z.enum(["1", "2", "3", "4", "5", "6"]),
    seating: z.enum(["Indoor", "Outdoor", "No Preference"]),
  });
  type form_schema = z.infer<typeof schema>;
  const form = useForm<form_schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: "No Comment",
      date: new Date(),
      number_of_guests: "1",
      seating: "No Preference",
    },
  });
  const createBooking = useCreateBooking();
  const onSubmit = (data: form_schema) => {
    console.log(data);
    createBooking.mutate(data);
  };

  const observe_date = form.watch("date");
  const listBookings = useListBookings(observe_date || new Date());
  const existingBookings = listBookings.data?.map((x, index) => {
    return (
      <div
        key={index}
        className="flex items-center justify-between rounded border border-slate-100 bg-slate-50 p-4"
      >
        <div className="grid gap-1">
          <div className="font-medium">{x.name}</div>
          <div className="text-sm text-slate-600">
            {x.number_of_guests} guests • {x.seating} seating
          </div>
          <div className="text-sm text-slate-500">Note: {x.comment}</div>
        </div>
        <div className="text-right">
          <div className="font-medium">{x.time}</div>
          <div className="text-sm text-slate-600">{x.email}</div>
        </div>
      </div>
    );
  });

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
    <main className="grid place-items-center gap-8">
      <div className="grid gap-3 px-6 py-12">
        <h1 className="text-center text-4xl font-bold">Reserve a Table</h1>
        <p className="text-center text-slate-600">
          Book your dining experience at Little Lemon. For parties larger than
          8, please call us directly at (555) 123-4567.
        </p>
      </div>
      <div className="mb-12 grid w-9/12 gap-6 rounded-md border border-slate-200 p-8 lg:w-1/2">
        <div className="grid place-items-center gap-2">
          <h2 className="text-center text-2xl font-semibold">
            Reservation Details
          </h2>
          <p className="text-center text-lg font-medium">
            Fill out the form below to book your table.
          </p>
        </div>
        <Form {...form}>
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
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
                    defaultValue={field.value}
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
                  <Popover>
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            // Fix timezone offset by setting to noon UTC
                            const fixedDate = new Date(
                              date.getTime() - date.getTimezoneOffset() * 60000,
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
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full rounded">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
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
                      defaultValue={field.value}
                      className="grid grid-cols-2 place-content-center"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Indoor" />
                        </FormControl>
                        <FormLabel className="font-normal">Indoor</FormLabel>
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
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="col-span-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="mb-24 grid w-9/12 gap-6 rounded-md border border-slate-200 p-8 lg:w-1/2">
        <div className="grid gap-2">
          <h3 className="text-xl font-semibold">
            Existing Reservations for{" "}
            {observe_date.toISOString().split("T")[0]}{" "}
          </h3>
          <p className="text-sm text-slate-600">
            View all bookings for the selected date
          </p>
        </div>
        <div className="grid gap-3">{existingBookings}</div>
      </div>
    </main>
  );
};
export default Reservation;
