import React, { useState } from "react";
import CartItemCard from "../../cards/CartItemCard/CartItemCard";
import { LiaBroomSolid } from "react-icons/lia";
import CartEmptyCard from "@/components/cards/CartEmptyCard/CartEmptyCard";
import useCartStore from "@/stores/useCartStore";
import { Product } from "@/types/entities";
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

interface CartSectionProps {
  cartItems: Product[];
  handleDelete: (id: number) => void;
}

const CartListCart: React.FC<CartSectionProps> = ({
  cartItems,
  handleDelete,
}) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isClearCart, setIsClearCart] = useState<boolean>(false);

  return (
    <section className="relative flex flex-col py-4">
      <button
        className="clearcart"
        onClick={() => setIsClearCart(true)} // Open alert for clearing cart
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
              <CartItemCard
                image={cardItem.relationships.media.at(0)?.original_url || ""}
                title={cardItem.title}
                price={cardItem.price}
                author={"christien"}
                onDelete={() => setSelectedItemId(cardItem.id)} // Open alert for deleting an item
              />
            </div>
          ))
        )}
      </div>

      <AlertDialog
        open={!!selectedItemId || isClearCart} // Open when either action is triggered
        onOpenChange={() => {
          setSelectedItemId(null);
          setIsClearCart(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {isClearCart
                ? "This action cannot be undone. It will permanently clear all items from your cart."
                : "This action cannot be undone. It will permanently delete this item from your cart."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* Cancel Button */}
            <AlertDialogCancel
              className="px-4 py-2 border border-gray-300 rounded hover:bg-black hover:text-white"
              onClick={() => {
                setSelectedItemId(null);
                setIsClearCart(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            {/* Action Button */}
            <AlertDialogAction
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-600"
              onClick={() => {
                if (isClearCart) {
                  clearCart(); // Clear the cart
                } else if (selectedItemId !== null) {
                  handleDelete(selectedItemId); // Delete the selected item
                }
                setSelectedItemId(null);
                setIsClearCart(false);
              }}
            >
              {isClearCart ? "Clear All" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default CartListCart;
