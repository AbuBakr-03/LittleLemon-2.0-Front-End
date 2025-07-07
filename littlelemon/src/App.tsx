import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";
import Reservation from "./pages/reservation/Reservation";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Wrapper from "./components/wrapper/Wrapper";
import Dashboard from "./pages/dashboard/Dashboard";
import ReservationTable from "./app/reservation-tables/ReservationTable";
import CategoryTable from "./app/category-tables/CategoryTable";
import MenuTable from "./app/menu-tables/MenuTable";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="reservations" element={<Reservation />}></Route>
          <Route path="log-in" element={<Login />}></Route>
          <Route path="sign-up" element={<Signup />}></Route>
        </Route>
        <Route path="dashboard/" element={<Dashboard />}>
          <Route path="booking" element={<ReservationTable />}></Route>
          <Route path="category" element={<CategoryTable />}></Route>
          <Route path="menu" element={<MenuTable />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
