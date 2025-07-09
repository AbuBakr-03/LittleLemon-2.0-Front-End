import { useAuth } from "@/contexts/AuthProvider";
import { useLocation, Outlet, Navigate } from "react-router-dom";

type roleType = {
  allowedRole: string;
};

// this is for protecting routes
const RequireAuth = ({ allowedRole }: roleType) => {
  const authContext = useAuth();
  const { auth } = authContext;
  const location = useLocation(); //location of current page
  return auth?.role == allowedRole ? (
    <Outlet /> // show the protected routes
  ) : auth?.user ? ( // if user exists,
    <Navigate
      to={"/unauthorized"}
      state={{ from: location }} //location of previous page "location.state.from.pathname", user will be redirected to /dashboard
      replace //replaces browser history from where user came from, if they came from dashboard, they dont go back to it as its removed
    />
  ) : (
    // else go to login page
    <Navigate
      to={"/log-in"}
      state={{ from: location }} //location of previous page "location.state.from.pathname", user will be redirected to /dashboard
      replace //replaces browser history from where user came from, if they came from dashboard, they dont go back to it as its removed
    />
  );
};
export default RequireAuth;
