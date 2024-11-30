import { Product } from "@/types/entities";
import { create } from "zustand";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

interface CartActions {
  addProductToCart: (item: Product) => void;
  removeProductFromCart: (id: number) => void;
  getTotalPrice: () => void;
  clearCart: () => void;
  loadCart: () => void;
  getTotalItems: () => number;
  getProductIDs: (products: CartItem[]) => number[]; 
}

const useCartStore = create<CartState & CartActions>((set, get) => ({
  totalPrice: 0,
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"), // Initialize with saved cart data

  addProductToCart: (item) => {
    const existingItem = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCartItems;
    if (!existingItem) {
      updatedCartItems = [...get().cartItems, { ...item, quantity: 1 }];
    } else {
      // Show alert instead of logging to the console
      alert("Item already exist in cart");
      return; // Prevent adding the item again
    }

    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Save to localStorage
  },

  removeProductFromCart: (id) => {
    const updatedCartItems = get().cartItems.filter((item) => item.id !== id);
    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Save to localStorage
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem("cartItems"); // Remove from localStorage
  },

  loadCart: () => {
    const savedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    set({ cartItems: savedCartItems }); // Load from localStorage
  },

  // getTotalPrice: () => {
  //   const total = get().cartItems.reduce(
  //     (total, product) => total + product.price * product.quantity,
  //     0
  //   );
  //   // console.log("sfskfhskfshj", get().cartItems);
  //   set({ totalPrice: total });
  // },

   getTotalPrice:  () => {
  const total = get().cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  set({ totalPrice: total });
  return total; // Add this line to return the total value
},


  getProductIDs: (products: CartItem[]) => {
    return products.map((product) => product.id);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;
