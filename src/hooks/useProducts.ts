import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/utils/fetcher';
import { PaginatedApiResponse, Product } from '@/types/entities';
import { useProductStore } from '@/stores/useProductStore';

export const useProducts = (page: number = 1, categoryId?: string) => {
  const { API } = useApi();
  const setProducts = useProductStore((state) => state.setProducts);
  const { data, isLoading, error } = useQuery<
    PaginatedApiResponse<Product> | Product[],
    Error
  >({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      if (categoryId) {
        const response = await API.getProductsByCategory(parseInt(categoryId));
        // console.log('res: ', response)
        setProducts(response);
        return response;
      }
      const response = await API.getAllProducts(page);

      // Store all products in Zustand store
      if (!categoryId && response.data) {
        setProducts(response.data);
      }
      return response;
    },
    staleTime: 0,
    // staleTime: 5 * 60 * 1000,
  });

  const products = Array.isArray(data) ? data : data?.data ?? [];

  return {
    products,
    isLoading,
    error,
  };
};
