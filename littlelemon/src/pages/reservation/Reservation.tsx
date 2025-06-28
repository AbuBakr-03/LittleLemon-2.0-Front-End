import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Calendar } from "@/components/ui/calendar";

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
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";

import { Input } from "../../components/ui/input";

const Reservation: React.FC = () => {
  const formSchema = z.object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters long." })
      .max(50, { message: "Full name must be 50 characters or fewer." }),
    email: z.string().email(),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Enter a valid phone number",
    }),
    guests: z.enum(
      [
        "1 Person",
        "2 People",
        "3 People",
        "4 People",
        "5 People",
        "6 People",
        "7 People",
        "8 People",
      ],
      { message: "Please select how many guests will be attending." },
    ),
    date: z.date({
      required_error: "Please select a reservation date.",
      invalid_type_error: "Invalid date format. Please select a valid date.",
    }),
    seating: z.enum(["Indoor", "Outdoor", "None"], {
      message: "Please choose a seating preference.",
    }),
    special: z.string().optional(),
    time: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <main className="grid place-items-center gap-8">
      <div className="grid gap-3 px-6 py-12">
        <h1 className="text-center text-4xl font-bold">Reserve a Table</h1>
        <p className="text-center text-slate-600">
          Book your dining experience at Little Lemon. For parties larger than
          8, please call us directly at (555) 123-4567.
        </p>
      </div>
      <div className="mb-24 grid w-9/12 gap-6 rounded-md border border-slate-200 p-8 lg:w-1/2">
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
              name="fullName"
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
              name="phoneNumber"
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
              name="guests"
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
                      <SelectItem value="1 Person">1 Person</SelectItem>
                      <SelectItem value="2 People">2 People</SelectItem>
                      <SelectItem value="3 People">3 People</SelectItem>
                      <SelectItem value="4 People">4 People</SelectItem>
                      <SelectItem value="5 People">5 People</SelectItem>
                      <SelectItem value="6 People">6 People</SelectItem>
                      <SelectItem value="7 People">7 People</SelectItem>
                      <SelectItem value="8 People">8 People</SelectItem>
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
                        onSelect={field.onChange}
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
                    <SelectContent>
                      <SelectItem value="19:00">19:00</SelectItem>
                      <SelectItem value="20:00">20:00</SelectItem>
                      <SelectItem value="21:00">21:00</SelectItem>
                    </SelectContent>
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
                          <RadioGroupItem value="None" />
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
              name="special"
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
    </main>
  );
};
export default Reservation;
