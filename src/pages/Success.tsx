import { useState, useEffect } from "react";
import SuccessPage from "@/components/sections/SuccessPage/SuccessPage";
import { Product } from "@/types/entities";

function Success() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Get cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);

    
  }, []);

  return <SuccessPage cartItems={cartItems} />;
}

export default Success;
