import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/entities';

type PurchasedProductState = {
  purchasedProducts: Product[];
  lastUpdated: number | null;
};

type PurchasedProductAction = {
  setPurchasedProducts: (products: Product[]) => void;
  clearPurchasedProducts: () => void;
};

export const usePurchasedProductStore = create<
  PurchasedProductState & PurchasedProductAction
>()(
  persist(
    (set) => ({
      purchasedProducts: [],
      lastUpdated: null,

      setPurchasedProducts: (products) => {
        set({
          purchasedProducts: products,
          lastUpdated: Date.now(),
        });
      },

      clearPurchasedProducts: () => {
        set({
          purchasedProducts: [],
          lastUpdated: null,
        });
      },
    }),
    {
      name: 'purchased-products-storage',
    }
  )
);
