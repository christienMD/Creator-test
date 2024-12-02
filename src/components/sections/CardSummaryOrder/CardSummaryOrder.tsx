import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import useCartStore from '@/stores/useCartStore';
import { Loader } from 'lucide-react';

interface CardCheckoutProps {
  // totalPrice: number;

  onBuyNow: () => void;
  isLoading: boolean;
}
const CardSummaryOrder: React.FC<CardCheckoutProps> = ({
  // totalPrice,
  isLoading,
  onBuyNow,
}) => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  // console.log('cart items', cartItems);
  console.log('total price ======>', totalPrice);
  return (
    <section className="border-[0.5px] border-[#39393980] bg-[#FFFBFB] mx lg:self-end rounded-md p-4 lg:ml-16 mt-[74px] gap-3">
      <h3 className="font-semibold text-[28px] gap-[10px]">Summary order</h3>
      <div className="flex justify-between items-center py-3">
        <p className="p-[10px] gap-[10px] font-medium text-xl text-[#393939]">
          Total
        </p>
        <p className="text-nowrap p-[10px] gap-[10px] font-medium text-2xl text-black">
          {totalPrice} FCFA
        </p>
      </div>
      <Link to="" className="group">
        <button
          onClick={onBuyNow}
          className="summarybutton flex items-center justify-center bg-[#004C4C] hover:bg-[#265858] text-white "
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Checking out...
            </>
          ) : (
            'Buy Now'
          )}
          <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </Link>
    </section>
  );
};

export default CardSummaryOrder;
