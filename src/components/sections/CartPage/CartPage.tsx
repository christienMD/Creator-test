import CardCheckoutFlow from '../CardCheckoutFlow/CardCheckoutFlow';
import CartListCart from '../CartListCart/CartListCart';
import CardSummaryOrder from '../CardSummaryOrder/CardSummaryOrder';
import useCartStore from '@/stores/useCartStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CardCheckout = () => {
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems, getTotalPrice, removeProductFromCart]);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      // Display the toast message if the cart is empty
      toast.error('Add at least one product to Cart');

      // Delay for 3 seconds before redirecting
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 3000);
    } else {
      // Proceed with the checkout if the cart has items
      navigate('/checkout', { state: { cartItems } });
      setIsLoading(true);
    }
  };

  console.log('cart items: ', cartItems);

  return (
    <div className="container p-2 mx-auto md:p-4 min-h-screen">
      <CardCheckoutFlow stageTitle={'My Cart'} />

      <div className="flex flex-col lg:flex-row mt-4">
        <div className="block w-full lg:w-2/3">
          <CartListCart
            cartItems={cartItems}
            handleDelete={removeProductFromCart}
          />
        </div>

        <div className="block w-full lg:w-1/3 lg:ml-4">
          <CardSummaryOrder isLoading={isLoading} onBuyNow={handleBuyNow} />
        </div>
      </div>
    </div>
  );
};

export default CardCheckout;
