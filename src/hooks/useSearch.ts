import { useSearchParams } from 'react-router-dom';
import { useApi } from '@/utils/fetcher';
import { Product } from '@/types/entities';
import { useState } from 'react';

// Search hook interface
interface UseSearchHook {
  searchedProducts: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchProducts: () => Promise<void>;
}
export const useSearch = (): UseSearchHook => {
  // Use search params from React Router
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [searchedProducts, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get API from custom hook
  const { API } = useApi();

  // Get search term from URL query parameter
  const searchTerm = searchParams.get('search') || '';

  // Set search term and update URL
  const setSearchTerm = (term: string) => {
    if (term) {
      setSearchParams({ search: term });
    } else {
      // Remove search param if term is empty
      setSearchParams({});
    }
  };

  // Search products function
  const searchProducts = async () => {
    // Reset state
    setIsLoading(true);
    setError(null);
    setProducts([]); // This line ensures products is always an array

    try {
      // Perform search if term is not empty
      if (searchTerm.trim()) {
        const results = await API.searchProducts(searchTerm);
        // Handle empty results

        if (!results || results.length === 0) {
          setError('No products found matching your search.');
          setProducts([]); // Explicitly set to an empty array
          return;
        }
        setProducts(results.data);
      } else {
        // If no search term, ensure products is an empty array
        setProducts([]);
      }
    } catch (err) {
      // Error handling
      const errorMessage =
        err instanceof Error
          ? err.message || 'Server Error'
          : 'An unexpected error occurred';
      setError(errorMessage);
      setProducts([]); // Ensure products is an empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchedProducts,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    searchProducts,
  };
};
