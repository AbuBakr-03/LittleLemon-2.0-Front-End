import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";
import type { request } from "@/apis/bookingapis";

const Actionscell = ({ item }: { item: request }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMobile, setmobile] = useState<boolean>(window.innerWidth < 600);

  const checksize = () => {
    if (window.innerWidth < 600) {
      setmobile(true);
    } else {
      setmobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      checksize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        checksize();
      });
    };
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Update{" "}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 focus:bg-red-100 focus:text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer
        open={isOpen}
        onOpenChange={setOpen}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>Edit Information </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={item.name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="seating">Seating</Label>
                  <Select defaultValue={item.seating}>
                    <SelectTrigger id="seating" className="w-full">
                      <SelectValue placeholder="Select a seating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indoor">Indoor</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                      <SelectItem value="No Preference">
                        No Preference
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="number_of_guests">Guests</Label>
                  <Select defaultValue={item.number_of_guests}>
                    <SelectTrigger id="number_of_guests" className="w-full">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 Persons</SelectItem>
                      <SelectItem value="3">3 Persons</SelectItem>
                      <SelectItem value="4">4 Persons</SelectItem>
                      <SelectItem value="5">5 Persons</SelectItem>
                      <SelectItem value="6">6 Persons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={item.email} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="phone_number">Phone</Label>
                  <Input id="phone_number" defaultValue={item.phone_number} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="comment">Comments</Label>
                <Input id="comment" defaultValue={item.comment} />
              </div>
            </form>
          </div>
          <DrawerFooter
            onClick={() => {
              setOpen(false);
            }}
          >
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Done</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Actionscell;
