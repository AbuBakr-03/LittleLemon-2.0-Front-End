import { Link } from "react-router-dom";
import { CitrusIcon } from "lucide-react";
const Footer: React.FC = () => {
  return (
    <footer className="grid gap-8 border-t bg-gray-50 p-6 text-sm md:grid-cols-4 md:place-items-start">
      <div className="grid gap-4">
        <Link to={"/"} className="flex gap-2 text-xl font-bold">
          <CitrusIcon className="h-6 w-6 text-yellow-500"></CitrusIcon>
          <span> Little Lemon</span>
        </Link>
        <p className="text-slate-600">
          Mediterranean cuisine with a modern twist, using fresh ingredients and
          authentic recipes.
        </p>
      </div>
      <nav className="grid gap-4">
        <h1 className="font-semibold">Navigation</h1>
        <ul className="grid gap-2 text-slate-700">
          <li>
            <Link className="hover:text-black" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-black" to={"/menu"}>
              Menu
            </Link>
          </li>
          <li>
            <Link className="hover:text-black" to={"/reservation"}>
              Reservation
            </Link>
          </li>
        </ul>
      </nav>
      <div className="grid gap-4">
        <h1 className="font-semibold">Contact</h1>
        <div className="grid gap-2 text-slate-700">
          <p>123 Mediterranean Avenue Chicago, IL 60007</p>
          <p>Phone: (555) 123-4567</p>
          <p>Email: info@littlelemon.com</p>
        </div>
      </div>
      <div className="grid gap-4">
        <h1 className="font-semibold">Hours</h1>
        <div className="grid gap-2 text-slate-700">
          <p>Monday - Friday: 11am - 10pm</p>
          <p>Saturday - Sunday: 10am - 11pm</p>
        </div>
      </div>
      <p className="border-t py-2 text-center text-slate-700 md:col-span-4 md:w-full md:place-self-center">
        © 2025 Little Lemon Restaurant. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
