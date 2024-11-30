
import { useEffect } from "react";
import Router from "./Routes/Router";
import useCartStore from "@/stores/useCartStore";

const App = () => {

  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart(); // Load cart data from localStorage on app initialization
  }, [loadCart]);

  return <Router />;
};

export default App;
