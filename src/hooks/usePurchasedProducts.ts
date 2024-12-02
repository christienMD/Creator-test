import { usePurchasedProductStore } from '@/stores/usePurchasesStore';
import { PaginatedApiResponse, Product } from '@/types/entities';
import { useApi } from '@/utils/fetcher';
import { useInfiniteQuery } from '@tanstack/react-query';

export const usePurchasedProducts = (token: string) => {
  const { API } = useApi();
  const setPurchases = usePurchasedProductStore(
    (state) => state.setPurchasedProducts
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PaginatedApiResponse<Product>, Error>({
    queryKey: ['purchasedProducts', token],
    queryFn: async ({ pageParam }) => {
      if (!token) throw new Error('No authentication token');

      // Explicitly convert pageParam to a number, defaulting to 1
      const page = pageParam !== undefined ? Number(pageParam) : 1;

      const response = await API.getPurchsedProducts(token, page);

      // Store first page data in Zustand store
      if (page === 1 && response.data) {
        setPurchases(response.data);
      }

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.meta.total / 12);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });

  const purchases = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    purchases,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

// import { usePurchasedProductStore } from '@/stores/usePurchasesStore';
// import { PaginatedApiResponse, Product } from '@/types/entities';
// import { useApi } from '@/utils/fetcher';
// import { useQuery } from '@tanstack/react-query';

// export const usePurchasedProducts = (token: string) => {
//   const { API } = useApi();

//   const setPurchases = usePurchasedProductStore(
//     (state) => state.setPurchasedProducts
//   );
//   const { data, isLoading, error } = useQuery<
//     PaginatedApiResponse<Product> | Product[],
//     Error
//   >({
//     queryKey: ['products', token],
//     queryFn: async () => {
//       if (token) {
//         const response = await API.getPurchsedProducts(token);
//         return response;
//       }
//       const response = await API.getPurchsedProducts(token);

//       //store all purchases in zustand store
//       if (!token && response.data) {
//         setPurchases(response.data);
//       }
//       return response;
//     },
//     staleTime: 5 * 60 * 1000,
//   });

//   const purchases = Array.isArray(data) ? data : data?.data ?? [];
//   return {
//     purchases,
//     isLoading,
//     error,
//   };
// };

// import { usePurchasedProductStore } from '@/stores/usePurchasesStore';
// import { PaginatedApiResponse, Product } from '@/types/entities';
// import { useApi } from '@/utils/fetcher';
// import { useQuery } from '@tanstack/react-query';

// export const usePurchasedProducts = (token: string) => {
//   const { API } = useApi();

//   const setPurchases = usePurchasedProductStore(
//     (state) => state.setPurchasedProducts
//   );
//   const { data, isLoading, error } = useQuery<
//     PaginatedApiResponse<Product> | Product[],
//     Error
//   >({
//     queryKey: ['products', token],
//     queryFn: async () => {
//       if (token) {
//         const response = await API.getPurchsedProducts(token);
//         return response;
//       }
//       const response = await API.getPurchsedProducts(token);

//       //store all purchases in zustand store
//       if (!token && response.data) {
//         setPurchases(response.data);
//       }
//       return response;
//     },
//     staleTime: 5 * 60 * 1000,
//   });

//   const purchases = Array.isArray(data) ? data : data?.data ?? [];
//   return {
//     purchases,
//     isLoading,
//     error,
//   };
// };
