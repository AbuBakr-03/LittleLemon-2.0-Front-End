import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type menu_type } from "@/apis/menuapis";
import { useListMenuItems } from "@/hooks/useMenu";
const Menu: React.FC = () => {
  const listMenuItems = useListMenuItems();

  const menu_filter = (filter: string) => {
    const filtered_data = listMenuItems.data?.filter((x) => {
      return x.category.category_name == filter;
    });
    return filtered_data || [];
  };

  const starters_data = menu_filter("Starters");
  const main_courses_data = menu_filter("Main Courses");
  const desserts_data = menu_filter("Desserts");
  const drinks_data = menu_filter("Drinks");

  const menu_map = (menu_list: menu_type[]) => {
    const mapped_data = menu_list.map((x, index) => {
      return (
        <Dialog>
          <div>
            <DialogTrigger asChild>
              <div key={index} className="grid gap-2 rounded-lg border p-6">
                <div className="grid grid-cols-2">
                  <h3 className="font-bold">{x.title}</h3>
                  <p className="place-self-end font-medium text-yellow-500">
                    ${x.price}
                  </p>
                </div>
                <p className="text-sm text-slate-600">{x.description}</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
              {/* <DialogHeader>
                <DialogTitle>{x.name}</DialogTitle>
                <DialogDescription>{x.description}</DialogDescription>
              </DialogHeader> */}
              <div className="grid gap-2 p-2 lg:grid-cols-2 lg:place-items-center">
                <img
                  src={x.logo}
                  className="aspect-[4/3] overflow-hidden rounded-t-lg object-cover lg:aspect-square lg:w-[300px] lg:rounded-md"
                  alt={x.logo}
                />
                <div className="grid gap-3 p-4 lg:gap-8">
                  <h4 className="text-2xl font-bold">{x.title}</h4>
                  <p className="text-muted-foreground">{x.description}</p>
                  <p className="text-primary text-3xl font-bold">${x.price}</p>
                  <DialogFooter className="grid grid-cols-2 items-center">
                    <DialogClose>
                      <Button className="w-full" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="w-full" type="submit">
                      Add to Cart
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      );
    });
    return mapped_data;
  };

  const starters = menu_map(starters_data);
  const main_courses = menu_map(main_courses_data);
  const desserts = menu_map(desserts_data);
  const drinks = menu_map(drinks_data);
  return (
    <main className="grid place-items-center">
      <div className="grid place-items-center gap-3 px-6 py-12 lg:w-6/12">
        <h1 className="text-4xl font-bold">Our Menu</h1>
        <p className="text-center text-slate-600">
          At Little Lemon, we pride ourselves on using the freshest ingredients
          to create authentic Mediterranean dishes with a modern twist. Our menu
          changes seasonally to incorporate the best local produce.
        </p>
      </div>
      <div className="grid w-full gap-8 px-6 py-8 lg:w-7/11">
        <h2 className="justify-self-start text-start text-2xl font-bold underline decoration-yellow-500 underline-offset-12">
          Starters
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">{starters}</div>
      </div>
      <div className="grid w-full gap-8 px-6 py-8 lg:w-7/11">
        <h2 className="justify-self-start text-start text-2xl font-bold underline decoration-yellow-500 underline-offset-12">
          Main Courses
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">{main_courses}</div>
      </div>
      <div className="grid w-full gap-8 px-6 py-8 lg:w-7/11">
        <h2 className="justify-self-start text-start text-2xl font-bold underline decoration-yellow-500 underline-offset-12">
          Desserts
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">{desserts}</div>
      </div>
      <div className="mb-6 grid w-full gap-8 px-6 py-8 lg:w-7/11">
        <h2 className="justify-self-start text-start text-2xl font-bold underline decoration-yellow-500 underline-offset-12">
          Drinks
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">{drinks}</div>
      </div>
    </main>
  );
};
export default Menu;
