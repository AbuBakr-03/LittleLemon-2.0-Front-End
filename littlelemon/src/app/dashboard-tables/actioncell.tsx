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
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
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
          <DropdownMenuItem className="text-red-600 focus:bg-red-100 focus:text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerClose}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>Edit Information</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="action-name">Name</Label>
                <Input id="action-name" defaultValue={item.name} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="action-seating">Seating</Label>
                  <Select defaultValue={item.seating}>
                    <SelectTrigger id="action-seating" className="w-full">
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
                  <Label htmlFor="action-guests">Guests</Label>
                  <Select defaultValue={item.number_of_guests}>
                    <SelectTrigger id="action-guests" className="w-full">
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
                  <Label htmlFor="action-email">Email</Label>
                  <Input id="action-email" defaultValue={item.email} />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="action-phone">Phone</Label>
                  <Input id="action-phone" defaultValue={item.phone_number} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="action-comment">Comments</Label>
                <Input id="action-comment" defaultValue={item.comment} />
              </div>
            </form>
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                // Handle form submission here
                setDrawerOpen(false);
              }}
            >
              Submit
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Actionscell;
