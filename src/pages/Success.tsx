import { useState, useEffect } from 'react';
import SuccessPage from '@/components/sections/SuccessPage/SuccessPage';
import { Product } from '@/types/entities';

function Success() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate fetching data (replace this with actual API call or state retrieval)
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  return <SuccessPage cartItems={cartItems} />;
}

export default Success;
