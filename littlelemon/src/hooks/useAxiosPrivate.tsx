import { useEffect } from "react";
// ➡️ What: React hook to run side effects (code that affects outside the component).
// 🔎 Why: Needed to set up and clean up Axios interceptors when the component using this hook mounts or unmounts.

import axios from "axios";
// ➡️ What: HTTP client for making requests to the backend API.
// 🔎 Why: We use Axios because it supports interceptors, base configuration, and token headers — perfect for auth APIs.

import { useAuth } from "@/contexts/AuthProvider";
// ➡️ What: Custom hook to access authentication state (e.g., current user, access token).
// 🔎 Why: We need to read the current access token so we can attach it to outgoing requests.

import { useRefreshToken } from "./useRefreshToken";
import { useLocation, useNavigate } from "react-router-dom";
// ➡️ What: Custom hook that returns a function to refresh the access token.
// 🔎 Why: Used when the access token has expired — to get a new one using the refresh token.

// 🔐 Create a reusable Axios instance configured for authenticated requests
const axiosPrivate = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // ➡️ What: Sets the base URL for all requests made using this instance.
  // 🔎 Why: Avoids repeating the full API URL everywhere — cleaner and consistent.

  headers: {
    "Content-Type": "application/json",
    // ➡️ What: Declares the format of the request body as JSON.
    // 🔎 Why: Ensures that the backend API knows how to parse our request data.
  },
});

// 🧠 Custom hook that returns the configured Axios instance with auth logic
export const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuth();
  // ➡️ What: Gets the current auth context.
  // 🔎 Why: Needed to access the current access token stored in context.

  const { auth, setAuth } = authContext;
  // ➡️ What: Extracts the auth object (contains access token).
  // 🔎 Why: We’ll use `auth.access` to attach to outgoing requests.

  const refresh = useRefreshToken();
  // ➡️ What: Gets the function that refreshes the access token.
  // 🔎 Why: We'll call this when we get a 401 (token expired) to get a new token.

  useEffect(() => {
    // 🔁 What: Sets up request and response interceptors on first render or when auth/refresh changes.
    // 🔎 Why: Interceptors let us handle token logic automatically on every request/response.

    // 📤 Request Interceptor
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        // ➡️ What: Checks if the Authorization header is missing
        // 🔎 Why: Avoids overwriting any manually added Authorization headers

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access}`;
          // ➡️ What: Adds the access token to the Authorization header
          // 🔎 Why: So the backend can verify the user on each protected request
        }

        return config;
        // ✅ What: Returns the updated request config
        // 🔎 Why: Needed to proceed with the request
      },
      (error) => Promise.reject(error),
      // ❌ What: If request setup fails, pass the error down the promise chain
      // 🔎 Why: So calling code can handle request setup errors if needed
    );

    // 📥 Response Interceptor
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      // ✅ What: If the response is successful, just return it
      // 🔎 Why: We don't need to modify successful responses

      async (error) => {
        const prevRequest = error?.config;
        // ➡️ What: Gets the original failed request configuration
        // 🔎 Why: We want to retry this request after refreshing the token

        // ❗ Check if token expired (401) and the request hasn't already been retried
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // ➡️ What: Marks the request as "sent" so we don't retry it again
          // 🔎 Why: Prevents infinite retry loops if the refresh also fails

          try {
            const newAccessToken = await refresh();
            // 🔄 What: Try to get a new access token using the refresh token
            // 🔎 Why: We need a valid token to retry the failed request

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            // ➡️ What: Update the Authorization header with the new token
            // 🔎 Why: So the retried request has a valid token

            return axiosPrivate(prevRequest);
            // 🔁 What: Resend the original request
            // 🔎 Why: Allows the operation to succeed without manual user input
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // ❌ What: Log the refresh error
            // 🔎 Why: Useful for debugging issues with refresh logic

            // 🔑 When refresh fails, clear auth and redirect
            console.error("Refresh token expired, redirecting to login");
            setAuth({
              access: null,
              refresh: null,
              user: null,
              role: null,
              password: null,
            });
            navigate("/log-in", { state: { from: location }, replace: true });

            return Promise.reject(refreshError);
            // ❌ What: Reject the request entirely
            // 🔎 Why: If refresh fails, there's no point retrying — user should log in again
          }
        }

        return Promise.reject(error);
        // ❌ What: If error isn't a 401 or has already been retried, pass it along
        // 🔎 Why: Let the calling code handle the error (like showing a message to user)
      },
    );

    // 🧹 Cleanup interceptors when component unmounts or dependencies change
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      // ➡️ What: Removes the request interceptor
      // 🔎 Why: Prevents memory leaks or duplicate interceptors on re-render

      axiosPrivate.interceptors.response.eject(responseInterceptor);
      // ➡️ What: Removes the response interceptor
      // 🔎 Why: Same as above — important for cleaning up side effects
    };
  }, [auth, refresh, navigate, location, setAuth]);
  // 📌 Dependencies for useEffect — re-run if `auth` or `refresh` function changes
  // 🔎 Why: Ensures interceptors always use the latest tokens/functions

  return axiosPrivate;
  // 🚀 What: Returns the configured axios instance
  // 🔎 Why: Other components can now use this to make secure, token-aware API calls
};
