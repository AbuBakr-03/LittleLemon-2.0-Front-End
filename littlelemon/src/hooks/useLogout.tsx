import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const useLogout = () => {
  const authContext = useAuth();
  const { setAuth } = authContext;

  const logout = async () => {
    setAuth({
      user: null,
      password: null,
      role: null,
      access: null,
      refresh: null,
    });
    try {
      await axios("http://127.0.0.1:8000/auth/logout/", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
