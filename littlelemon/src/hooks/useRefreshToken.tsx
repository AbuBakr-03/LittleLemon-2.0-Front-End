import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";

export const useRefreshToken = () => {
  const authContext = useAuth();
  const { auth, setAuth } = authContext;
  const refresh = async () => {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/auth/jwt/refresh/",
      {
        refresh: auth.refresh,
      },
      {
        withCredentials: true,
      },
    );
    setAuth((prev) => {
      console.log(data.access);
      return { ...prev, access: data.access, refresh: data.refresh };
    });
    return data.access;
  };
  return refresh;
};
