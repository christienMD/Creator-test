import { create } from 'zustand';
import { useApi } from '@/utils/fetcher';

// Define the type for the store state
interface SingleProductState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any | null;
  isLoading: boolean;
  error: string | null;
  fetchSingleProduct: (productId: number) => Promise<void>;
  resetProduct: () => void;
}

export const useSingleProduct = create<SingleProductState>((set) => {
  const { API } = useApi();

  return {
    product: null,
    isLoading: false,
    error: null,

    fetchSingleProduct: async (productId: number) => {
      // Reset previous state
      set({ 
        product: null, 
        isLoading: true, 
        error: null 
      });

      try {
        const fetchedProduct = await API.getSingleProduct(productId);
        
        set({ 
          product: fetchedProduct, 
          isLoading: false,
          error: null 
        });
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'An error occurred while fetching the product';
        
        set({ 
          product: null, 
          isLoading: false, 
          error: errorMessage 
        });
      }
    },

    resetProduct: () => {
      set({ 
        product: null, 
        isLoading: false, 
        error: null 
      });
    }
  };
});