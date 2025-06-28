import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";
import Reservation from "./pages/reservation/Reservation";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Home />}></Route>
          <Route path="menu" element={<Menu />}></Route>
          <Route path="reservations" element={<Reservation />}></Route>
          <Route path="log-in" element={<Login />}></Route>
          <Route path="sign-up" element={<Signup />}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
