import { useInfiniteQuery } from "@tanstack/react-query";
import { useApi } from "@/utils/fetcher";
import { ApiResponse, Product } from "@/types/entities";

export const useInfiniteProducts = (categoryId?: string) => {
  const { API } = useApi();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse<Product> | Product[], Error>({
    queryKey: ["infiniteProducts", categoryId],
    queryFn: ({ pageParam }) => {
      if (categoryId) {
        return API.getProductsByCategory(parseInt(categoryId));
      }
      return API.getAllProducts(pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (Array.isArray(lastPage)) return undefined;

      const totalPages = Math.ceil(lastPage.meta.total / 12);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products =
    data?.pages.flatMap((page) => (Array.isArray(page) ? page : page.data)) ??
    [];

  return {
    products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: categoryId ? false : hasNextPage,
    isFetchingNextPage,
  };
};
