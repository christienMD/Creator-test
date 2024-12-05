import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CartItemCheckout from '@/components/cards/CartItemCheckout/CartItemCheckout';
import { Product } from '@/types/entities';
import { Link } from 'react-router-dom';
import CartEmptyCard from '@/components/cards/CartEmptyCard/CartEmptyCard';
import useCartStore from '@/stores/useCartStore';

interface PurchaseProductProps {
  cartItems: Product[];
}

const SuccessPage: React.FC<PurchaseProductProps> = ({ cartItems }) => {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems, getTotalPrice]);

  const totalPrice = useCartStore((state) => state.totalPrice);
  //make total price to display to 2dp
  const finalPrice = totalPrice.toFixed(3);

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="w-[500px] p-6  ">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="mt-2 text-gray-600">Thank you for your purchase!</p>
        </div>

        <div className="mt-6">
          <p className="font-medium mb-4 text-center">Order Summary:</p>
          {cartItems.length === 0 ? (
            <CartEmptyCard />
          ) : (
            cartItems.map((cardItem) => (
              <div key={cardItem.id}>
                <CartItemCheckout
                  image={cardItem.relationships.media.at(0)?.original_url || ''}
                  title={cardItem.title}
                  price={cardItem.price}
                />
              </div>
            ))
          )}
        </div>

        <h3 className="font-semibold text-xl text-center mt-6">
          Summary Order
        </h3>
        <div className="flex justify-between items-center py-3 border-t mt-4">
          <p className="font-medium text-lg text-gray-700">Total:</p>
          <p className="font-medium text-xl text-black">{finalPrice} FCFA</p>
        </div>

        <div className="mt-4">
          <Link to="/my-content">
            <Button className="w-full bg-creator-bg-400 hover:bg-creator-bg-400 hover:opacity-75 text-center flex items-center justify-center gap-2">
              View Purchase Order
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
