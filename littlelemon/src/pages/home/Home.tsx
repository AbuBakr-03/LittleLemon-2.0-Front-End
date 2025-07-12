import heroimg from "../../assets/Hero.avif";
import { Link } from "react-router-dom";
import { Clock, MapPin, Phone } from "lucide-react";
import { useListMenuItems } from "@/hooks/useMenu";
const Home: React.FC = () => {
  const listMenuItems = useListMenuItems();
  const images = listMenuItems.data?.map((x) => {
    return x;
  });
  return (
    <main className="grid place-items-center gap-8">
      <div className="grid place-items-center gap-8 bg-yellow-50">
        <div className="grid gap-6 px-6 py-12 md:grid-cols-2 md:place-items-center md:gap-8 md:py-24 lg:w-9/12">
          <div className="grid place-items-center gap-5 md:place-items-start">
            <div className="grid gap-2 text-center md:text-start">
              <h1 className="text-5xl font-bold">Fresh & Zesty</h1>
              <h1 className="text-5xl font-bold text-yellow-500">
                Little Lemon
              </h1>
            </div>
            <p className="text-center text-lg text-slate-600 md:text-start">
              Experience Mediterranean flavors with a modern twist. Our
              family-owned restaurant brings you fresh ingredients and authentic
              recipes.
            </p>
            <Link
              className="rounded-md border bg-black px-6 py-3 text-white"
              to={"/reservation"}
            >
              Reserve a Table
            </Link>
          </div>
          <img
            src={heroimg}
            alt="serving"
            className="aspect-[21/9] w-full rounded-xl object-cover md:aspect-square md:max-h-[600px] md:max-w-[800px]"
          />
        </div>
      </div>
      <div className="grid place-items-center gap-8">
        <div className="grid gap-8 px-6 py-12 lg:w-9/12">
          <div className="grid grid-cols-2 place-items-center">
            <h1 className="justify-self-start text-3xl font-bold">
              This Week's Specials
            </h1>
            <Link
              className="justify-self-end rounded-md border bg-black px-4 py-2 text-white"
              to={"/menu"}
            >
              Full Menu
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            <div className="overflow-hidden rounded-t-xl rounded-b-md border hover:shadow-lg md:rounded-t-md">
              <img
                className="aspect-[21/9] max-h-[200px] w-full rounded-t-xl object-cover md:aspect-[9/8] md:rounded-t-md"
                src={images?.[0]?.logo || heroimg}
                alt="serving"
              />
              <div className="grid gap-2 px-4 py-6">
                <div className="grid grid-cols-2 place-items-center">
                  <p className="justify-self-start font-bold">
                    {images?.[0]?.title || "Greek Salad"}
                  </p>
                  <p className="justify-self-end font-semibold text-yellow-500">
                    {images?.[0]?.price || "$12.99"}
                  </p>
                </div>
                <p className="text-slate-600">
                  {images?.[0]?.description ||
                    "Fresh vegetables, olives, and our house-made feta cheese dressed with olive oil."}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-t-xl rounded-b-md border hover:shadow-lg md:rounded-t-md">
              <img
                className="aspect-[21/9] max-h-[200px] w-full rounded-t-xl object-cover md:aspect-[9/8] md:rounded-t-md"
                src={images?.[1]?.logo || heroimg}
                alt="serving"
              />
              <div className="grid gap-2 px-4 py-6">
                <div className="grid grid-cols-2 place-items-center">
                  <p className="justify-self-start font-bold">
                    {images?.[1]?.title || "Greek Salad"}
                  </p>
                  <p className="justify-self-end font-semibold text-yellow-500">
                    {images?.[1]?.price || "$12.99"}
                  </p>
                </div>
                <p className="text-slate-600">
                  {images?.[1]?.description ||
                    "Fresh vegetables, olives, and our house-made feta cheese dressed with olive oil."}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-t-xl rounded-b-md border hover:shadow-lg md:rounded-t-md">
              <img
                className="aspect-[21/9] max-h-[200px] w-full rounded-t-xl object-cover md:aspect-[9/8] md:rounded-t-md"
                src={images?.[2]?.logo || heroimg}
                alt="serving"
              />
              <div className="grid gap-2 px-4 py-6">
                <div className="grid grid-cols-2 place-items-center">
                  <p className="justify-self-start font-bold">
                    {images?.[2]?.title || "Greek Salad"}
                  </p>
                  <p className="justify-self-end font-semibold text-yellow-500">
                    {images?.[2]?.price || "$12.99"}
                  </p>
                </div>
                <p className="text-slate-600">
                  {images?.[2]?.description ||
                    "Fresh vegetables, olives, and our house-made feta cheese dressed with olive oil."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid place-items-center gap-6 bg-yellow-50">
        <div className="grid gap-6 bg-yellow-50 px-6 py-12 lg:w-9/12">
          <h1 className="text-center text-3xl font-bold">
            What Our Customers Say
          </h1>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="grid gap-2 rounded border-r-2 border-b-2 border-slate-200 bg-white px-6 py-4">
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-slate-600">
                "Authentic Mediterranean flavors that remind me of home!"
              </p>
              <p className="font-semibold">- Maria</p>
            </div>
            <div className="grid gap-2 rounded border-r-2 border-b-2 border-slate-200 bg-white px-6 py-4">
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-slate-600">
                "Authentic Mediterranean flavors that remind me of home!"
              </p>
              <p className="font-semibold">- Maria</p>
            </div>
            <div className="grid gap-2 rounded border-r-2 border-b-2 border-slate-200 bg-white px-6 py-4">
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-slate-600">
                "Authentic Mediterranean flavors that remind me of home!"
              </p>
              <p className="font-semibold">- Maria</p>
            </div>
            <div className="grid gap-2 rounded border-r-2 border-b-2 border-slate-200 bg-white px-6 py-4">
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-slate-600">
                "Authentic Mediterranean flavors that remind me of home!"
              </p>
              <p className="font-semibold">- Maria</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-12 md:place-items-center">
        <div className="grid gap-6 md:grid-cols-2 md:place-items-center lg:w-9/12">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Little Lemon Story</h1>
            <p className="text-slate-600">
              Little Lemon was founded in 2023 by the Rossi family, bringing
              their generations-old recipes from the Mediterranean coast to your
              table.
            </p>
            <p className="text-slate-600">
              We believe in using the freshest ingredients, locally sourced
              whenever possible, and preparing everything with love and care.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <img
              className="aspect-[8/9] w-full rounded-md object-cover md:aspect-[2/4]"
              src={images?.[9]?.logo || heroimg}
            />
            <img
              className="aspect-[8/9] w-full rounded-md object-cover md:aspect-[2/4]"
              src={images?.[8]?.logo || heroimg}
            />
          </div>
        </div>
      </div>

      <div className="grid w-full place-items-center gap-6 bg-gray-50 px-6 py-12">
        <div className="grid w-full gap-6 lg:w-9/12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="grid place-items-center gap-2 rounded bg-white px-6 py-6 shadow-xs">
              <Clock className="mb-2 h-10 w-10 text-yellow-500"></Clock>
              <h3 className="text-xl font-bold">Hours</h3>
              <div className="grid place-items-center text-center text-slate-600">
                <p>Monday - Friday: 11am - 10pm</p>
                <p>Saturday - Sunday: 10am - 11pm</p>
              </div>
            </div>
            <div className="grid place-items-center gap-2 rounded bg-white px-6 py-6 shadow-xs">
              <MapPin className="mb-2 h-10 w-10 text-yellow-500"></MapPin>
              <h3 className="text-xl font-bold">Location</h3>
              <div className="grid place-items-center text-center text-slate-600">
                <p>123 Mediterranean Avenue</p>
                <p>Chicago, IL 60007</p>
              </div>
            </div>
            <div className="grid place-items-center gap-2 rounded bg-white px-6 py-6 shadow-xs">
              <Phone className="mb-2 h-10 w-10 text-yellow-500"></Phone>
              <h3 className="text-xl font-bold">Contact</h3>
              <div className="grid place-items-center text-center text-slate-600">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@littlelemon.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
