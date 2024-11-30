import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProductCheckoutFlow from "../CardCheckoutFlow/CardCheckoutFlow";
import CartListCheckout from "../CartListCheckout/CartListCheckout";
import CheckoutPaymentDetails from "../CheckoutPaymentDetails/CheckoutPaymentDetails";
import CardSummaryOrder from "../CardSummaryOrder/CardSummaryOrder";
import useCartStore from "@/stores/useCartStore";
import { useApi } from "@/utils/fetcher";
import { ApiError } from "@/types/index-d";
import { CheckoutEntity } from "@/types/entities";
import { toast } from "react-toastify";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

const ProductCheckout = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [phoneNumber, setPhoneNumber] = useState("");

  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const getProductIDs = useCartStore((state) => state.getProductIDs);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems, navigate]);

  const productIds = getProductIDs(cartItems);
  const checkoutData: CheckoutEntity = {
    phone_number: phoneNumber,
    product_ids: productIds,
  };

  const { API } = useApi();

  const handleBuyNow = async () => {
    try {
      // Check if the phone number is provided
      if (!phoneNumber.trim()) {
        toast.error("Please input your phone number", {
          position: "top-right",
          autoClose: 3000, // Automatically close after 5 seconds
          
        });
        return; // Stop execution if phone number is not provided
      }

      setIsLoading(true);
      setApiError(null);
      
      // Check for token, redirect to login if not present
      const token = localStorage.getItem("auth_token");
      if (!token) {
        // Store current cart and intended checkout in local storage
        localStorage.setItem("checkout_cart_items", JSON.stringify(cartItems));

        // Navigate to login with a return path
        navigate("/login", {
          state: {
            from: "/checkout",
            message: "Please log in to complete your purchase",
          },
        });
        return;
      }

      // Proceed with checkout if token exists
      const response = await API.checkoutProduct(checkoutData, token);

      const paymentLink = response[1]?.payment_link;

      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        toast.error("Unable to process payment");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Checkout error:", error);
      const errorMessage = error?.message || "Invalid credentials";
      setApiError({
        message: errorMessage,
        errors: error?.errors,
      });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getTotalPrice();
  }, [cartItems, getTotalPrice]);

  return (
    <div className="container p-2 mx-auto md:p-4">
      <ProductCheckoutFlow stageTitle="Checkout" />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between mt-4">
        <div className="block w-full lg:w-2/3 mr-32 font-medium text-[28px] text-black">
          <h3 className="gap-[10px] pt-5">Payment Information</h3>
          
          <CheckoutPaymentDetails
            details={[]}
            onPhoneNumberChange={setPhoneNumber}
          />
        </div>
        <div className="block w-full lg:w-1/3 lg:ml-4">
          <div className="block w-full">
            <CartListCheckout
              cartItems={cartItems}
              handleDelete={removeProductFromCart}
            />
          </div>
          <CardSummaryOrder isLoading={isLoading} onBuyNow={handleBuyNow} />

          {apiError && (
            <ErrorAlert title="checkout error" message={apiError?.message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
