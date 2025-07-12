import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";
import Reservation from "./pages/reservation/Reservation";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import ReservationTable from "./app/reservation-tables/ReservationTable";
import CategoryTable from "./app/category-tables/CategoryTable";
import MenuTable from "./app/menu-tables/MenuTable";
import { Toaster } from "sonner";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="reservation" element={<Reservation />}></Route>
          <Route path="log-in" element={<Login />}></Route>
          <Route path="sign-up" element={<Signup />}></Route>
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={"admin"} />}>
            <Route path="dashboard/" element={<Dashboard />}>
              <Route path="booking" element={<ReservationTable />}></Route>
              <Route path="category" element={<CategoryTable />}></Route>
              <Route path="menu" element={<MenuTable />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
