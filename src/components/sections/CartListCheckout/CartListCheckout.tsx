import React, { useState } from "react";
import { LiaBroomSolid } from "react-icons/lia";
import CartEmptyCard from "@/components/cards/CartEmptyCard/CartEmptyCard";
import CartItemCheckout from "@/components/cards/CartItemCheckout/CartItemCheckout";
import { Product } from "@/types/entities";
import useCartStore from "@/stores/useCartStore";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Update this path to the correct location of AlertDialog components

interface CartListCheckoutProps {
  cartItems: Product[]; // Ensure this matches the type from the store
  handleDelete: (id: number) => void;
}

const CartListCheckout: React.FC<CartListCheckoutProps> = ({
  cartItems,
  handleDelete,
}) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const [isClearCart, setIsClearCart] = useState<boolean>(false);

  return (
    <section className="relative flex flex-col py-4">
      <button
        className="clearcart"
        onClick={() => setIsClearCart(true)} // Trigger alert for clearing cart
      >
        <LiaBroomSolid />
        Clear cart
      </button>
      <div className="flex flex-col gap-5">
        {cartItems.length === 0 ? (
          <CartEmptyCard />
        ) : (
          cartItems.map((cardItem) => (
            <div key={cardItem.id}>
              <CartItemCheckout
                image={
                  cardItem.relationships?.media?.length > 0
                    ? cardItem.relationships.media[0]?.original_url
                    : "/default-image.png"
                }
                title={cardItem.title}
                price={cardItem.price}
                onDelete={() => handleDelete(cardItem.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Alert Dialog for Clear Cart */}
      <AlertDialog
        open={isClearCart}
        onOpenChange={() => setIsClearCart(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. It will permanently clear all items
              from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* Cancel Button */}
            <AlertDialogCancel
              className="px-4 py-2 border border-gray-300 rounded hover:bg-black hover:text-white"
              onClick={() => setIsClearCart(false)}
            >
              Cancel
            </AlertDialogCancel>
            {/* Action Button */}
            <AlertDialogAction
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600"
              onClick={() => {
                clearCart(); // Clear the cart
                setIsClearCart(false);
              }}
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default CartListCheckout;
