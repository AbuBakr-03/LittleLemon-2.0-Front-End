import GreekSalad from "../../assets/GreekSalad.webp";
import Calamari from "../../assets/Calamari.webp";
import Bruschetta from "../../assets/Bruschetta.webp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
const Menu: React.FC = () => {
  type menu_type = {
    name: string;
    price: string;
    description: string;
    category: string;
    image: string;
  };
  const data = [
    {
      name: "Greek Salad",
      price: "12.99",
      description:
        "Fresh vegetables, olives, and our house-made feta cheese, dressed with olive oil.",
      category: "starter",
      image: GreekSalad,
    },
    {
      name: "Bruschetta",
      price: "9.99",
      description:
        "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil.",
      category: "starter",
      image: Bruschetta,
    },
    {
      name: "Calamari",
      price: "14.99",
      description:
        "Lightly fried squid served with lemon aioli and marinara sauce.",
      category: "starter",
      image: Calamari,
    },
    {
      name: "Greek Salad",
      price: "12.99",
      description:
        "Fresh vegetables, olives, and our house-made feta cheese, dressed with olive oil.",
      category: "main courses",
      image: GreekSalad,
    },
    {
      name: "Bruschetta",
      price: "9.99",
      description:
        "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil.",
      category: "main courses",
      image: Bruschetta,
    },
    {
      name: "Calamari",
      price: "14.99",
      description:
        "Lightly fried squid served with lemon aioli and marinara sauce.",
      category: "main courses",
      image: Calamari,
    },
    {
      name: "Greek Salad",
      price: "12.99",
      description:
        "Fresh vegetables, olives, and our house-made feta cheese, dressed with olive oil.",
      category: "desserts",
      image: GreekSalad,
    },
    {
      name: "Bruschetta",
      price: "9.99",
      description:
        "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil.",
      category: "desserts",
      image: Bruschetta,
    },
    {
      name: "Calamari",
      price: "14.99",
      description:
        "Lightly fried squid served with lemon aioli and marinara sauce.",
      category: "desserts",
      image: Calamari,
    },
    {
      name: "Greek Salad",
      price: "12.99",
      description:
        "Fresh vegetables, olives, and our house-made feta cheese, dressed with olive oil.",
      category: "drinks",
      image: GreekSalad,
    },
    {
      name: "Bruschetta",
      price: "9.99",
      description:
        "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil.",
      category: "drinks",
      image: Bruschetta,
    },
    {
      name: "Calamari",
      price: "14.99",
      description:
        "Lightly fried squid served with lemon aioli and marinara sauce.",
      category: "drinks",
      image: Calamari,
    },
  ];
  const data_filter = (filter: string) => {
    const filtered_data = data.filter((x) => {
      return x.category == filter;
    });
    return filtered_data;
  };
  const starters_data = data_filter("starter");
  const main_courses_data = data_filter("main courses");
  const desserts_data = data_filter("desserts");
  const drinks_data = data_filter("drinks");

  const data_map = (menu_list: menu_type[]) => {
    const mapped_data = menu_list.map((x, index) => {
      return (
        <Dialog>
          <div>
            <DialogTrigger asChild>
              <div key={index} className="grid gap-2 rounded-lg border p-6">
                <div className="grid grid-cols-2">
                  <h3 className="font-bold">{x.name}</h3>
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
                  src={x.image}
                  className="aspect-[4/3] overflow-hidden rounded-t-lg object-cover lg:aspect-square lg:w-[300px] lg:rounded-md"
                  alt={x.name}
                />
                <div className="grid gap-3 p-4 lg:gap-8">
                  <h4 className="text-2xl font-bold">{x.name}</h4>
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
  const starters = data_map(starters_data);
  const main_courses = data_map(main_courses_data);
  const desserts = data_map(desserts_data);
  const drinks = data_map(drinks_data);
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
