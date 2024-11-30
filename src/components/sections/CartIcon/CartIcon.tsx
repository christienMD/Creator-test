import { motion } from 'framer-motion';
import useCartStore from '@/stores/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

const CartIcon = () => {
  const totalProducts = useCartStore((state) => state.getTotalItems());
  const [animate, setAnimate] = useState(false);

  // Listen for changes in total products to trigger animation
  useEffect(() => {
    if (totalProducts > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 800); // Longer animation duration
      return () => clearTimeout(timer);
    }
  }, [totalProducts]);

  return (
    <motion.div
      className="relative inline-block"
      animate={
        animate
          ? {
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, -15, 15, -15, 0],
              transition: {
                duration: 0.8,
                ease: 'easeInOut',
                times: [0, 0.2, 0.4, 0.6, 1],
              },
            }
          : {}
      }
    >
      {/* Badge */}
      <motion.div
        className="absolute -top-2 -right-2 bg-green-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          animate
            ? {
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1],
                transition: {
                  duration: 0.8,
                  ease: 'easeInOut',
                },
              }
            : {}
        }
        whileHover={{ scale: 1.1 }}
      >
        {totalProducts}
      </motion.div>

      {/* Cart Icon */}
      <ShoppingCart className="w-8 h-8" style={{ transformOrigin: 'center' }} />
    </motion.div>
  );
};

export default CartIcon;
