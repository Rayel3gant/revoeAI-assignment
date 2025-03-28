import {  jwtDecode } from "jwt-decode"; // Correct named import
import { toast } from "sonner";
import { clearToken } from "./redux/tableSlice";

interface JwtPayload {
  exp: number; // Expiration time in seconds since the epoch
}

export const handleTokenExpiration = (
  token: string,
  dispatch: any, // Use appropriate type for dispatch
  router: any    // Use appropriate type for router
) => {
  if (!token) return;

  try {
    // Decode the JWT token to extract expiration time
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    console.log("Decoded",decoded)
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate remaining time until token expiration
    const timeUntilExpiration = (decoded.exp - currentTime) * 1000;

    if (timeUntilExpiration > 0) {
      // Set a timeout to log out the user when the token expires
      setTimeout(() => {
        toast("Session expired. Logging out...");
        dispatch(clearToken()); 
        router.push("/login"); // Redirect to login page
      }, timeUntilExpiration);
    } else {
      // Token has already expired
      toast("Session expired. Logging out...");
      dispatch(clearToken()); 
    router.push("/login"); // Redirect to login page
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
};
