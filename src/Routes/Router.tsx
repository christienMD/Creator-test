import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import LandingPage from "@/pages/Landing";
import CatalogPage from "@/pages/Catalog";
import MyContentPage from "@/pages/MyContent";
import DetailsPage from "@/pages/Details";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/ProductCheckout";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import CreatorsHomePage from "@/pages/CreatorsHomePage";
import CreatorsDashboard from "@/pages/CreatorsDashboard";
import Library from "@/pages/Library";
import NewProduct from "@/pages/NewProduct";
import PrivateRoutes from "@/pages/PrivateRoutes";
import Success from "@/pages/Success";
import ResetPassword from "@/pages/PasswordReset";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/catalog",
    element: <CatalogPage />,
  },
  {
    path: "/product/:type/:slug",
    element: <DetailsPage />,
  },
  {
    path: "/password-reset",
    element: <ResetPassword />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },

  // All protected routes under a single PrivateRoutes wrapper
  {
    element: <PrivateRoutes />,
    children: [
      // User routes
      {
        path: "/my-content",
        element: <MyContentPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      // Creator routes
      {
        path: "/creator/home",
        element: <CreatorsHomePage />,
      },
      {
        path: "/creator/dashboard",
        element: <CreatorsDashboard />,
      },
      {
        path: "/creator/library",
        element: <Library />,
      },
      {
        path: "/creator/product/new",
        element: <NewProduct />,
      },
      // Shared protected routes
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
