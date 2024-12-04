import { useState, useEffect } from "react";
import SuccessPage from "@/components/sections/SuccessPage/SuccessPage";
import { Product } from "@/types/entities";
import useCartStore from "@/stores/useCartStore";

function Success() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Get cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);

    const timeoutId = setTimeout(() => {
      clearCart();
      setCartItems([]);
      localStorage.removeItem("cartItems");
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, [clearCart]);

  return <SuccessPage cartItems={cartItems} />;
}

export default Success;
