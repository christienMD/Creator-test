import { Product } from "@/types/entities";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductState = {
  products: Product[];
  lastUpdated: number | null;
};

type ProductAction = {
  setProducts: (products: Product[]) => void;
  clearProducts: () => void;
};

export const useProductStore = create<ProductAction & ProductState>()(
  persist(
    (set) => ({
      products: [],
      lastUpdated: null,
      setProducts: (products: Product[]) => {
        set({
          products,
          lastUpdated: Date.now(),
        });
      },
      clearProducts: () => {
        set({
          products: [],
          lastUpdated: null,
        });
      },
    }),
    {
      name: "product-storage",
    }
  )
);
