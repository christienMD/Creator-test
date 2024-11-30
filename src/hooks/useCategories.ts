import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/utils/fetcher";
import { Category, ApiResponse } from "@/types/entities";

export const useCategories = () => {
  const { API } = useApi();

  const { data, isLoading, error } = useQuery<ApiResponse<Category>, Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = await API.getAllCategories();
      return categories;
    },
    staleTime: 1 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    categories: data?.data ?? [],
    isLoading,
    error,
  };
};
