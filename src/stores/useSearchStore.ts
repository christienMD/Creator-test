import { create } from 'zustand';
import { useApi } from '@/utils/fetcher';
import { Product } from '@/types/entities';

interface SearchStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchProducts: (param: string) => Promise<Product[]>;
}

export const useSearchStore = create<SearchStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  searchProducts: async (param: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { API } = useApi();

    // Reset previous state before new search
    set({ isLoading: true, error: null, products: [] });

    try {
      // Perform the search using the API method
      const searchResults = await API.searchProducts(param);

      // Check if results are empty
      if (!searchResults || searchResults.length === 0) {
        set({ 
          products: [], 
          isLoading: false,
          error: "No products found matching your search."
        });
        return [];
      }

      // Update store with search results
      set({ 
        products: searchResults, 
        isLoading: false,
        error: null
      });

      return searchResults;
    } catch (error) {
      // More detailed error handling
      const errorMessage = error instanceof Error 
        ? error.message || 'Server Error' 
        : 'An unexpected error occurred';

      // Update store with error
      set({ 
        products: [], 
        isLoading: false, 
        error: errorMessage 
      });

      // Re-throw to allow component-level error handling
      throw error;
    }
  }
}));