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

  // Protected routes for all authenticated users
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/my-content",
        element: <MyContentPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "/product/:type/:slug",
        element: <DetailsPage />,
      },
    ],

  },

  // Protected creator routes
  {
    element: <PrivateRoutes />,
    children: [
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
       {
    path: "/checkout/success",
    element: <Success />,
  },
    ],

  },

]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
