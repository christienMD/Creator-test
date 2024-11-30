import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const location = useLocation();

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("auth_token");
      const userDataString = localStorage.getItem("userData");

      if (!token || !userDataString) {
        return null;
      }

      return JSON.parse(userDataString);
    } catch {
      // Clear invalid data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userData");
      return null;
    }
  };

  const user = checkAuth();

  // Handle unauthenticated users
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Protect creator routes from customers
  if (user.role === "customer" && location.pathname.startsWith("/creator")) {
    toast.info("This area is reserved for creators. Please sign up as a creator to access these features.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
