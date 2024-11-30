import ProductCard from "@/components/cards/ProductCard/ProductCard";
import Sidemenu from "../SideMenu/Sidemenu";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { useSearch } from "@/hooks/useSearch";
import { ProductCardSkeleton } from "@/components/cards/ProductCardSkeleton/ProductCardSkeleton";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
const Catalog = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id") ?? undefined;

  const {
    products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(categoryId);
  const {
    searchedProducts,
    isLoading: isSearchLoading,
    searchProducts,
    searchTerm,
  } = useSearch();
  

  useEffect(() => {
    if (searchTerm) {
      searchProducts();
    }
  }, [searchTerm]);
  if (error) {
    return (
      <ErrorComponent
        title="Error Loading Products"
        message={error?.message || "Error loading products"}
      />
    );
  }
  const renderContent = () => {
    if (searchTerm) {
      if (isSearchLoading) {
        return Array(12)
          .fill(null)
          .map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />);
      }
      if (searchedProducts.length > 0) {
        return searchedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            creator={product.relationships?.creator}
            category={product.relationships?.category}
          />
        ));
      }
      return (
        <div className="col-span-full text-center text-gray-500 mt-8">
          No products found for "{searchTerm}"
        </div>
      );
    }
    if (isLoading) {
      return Array(12)
        .fill(null)
        .map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />);
    }
    return products?.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        creator={product.relationships?.creator}
        category={product.relationships?.category}
      />
    ));
  };
  return (
    <div className="px-6">
      <SearchBar />
      <div className="flex-grow flex flex-col lg:flex-row mt-4">
        <div className="lg:w-[280px] lg:flex-shrink-0">
          <Sidemenu />
        </div>
        <main className="p-2 mb-10">
          <div className="mt-14">
            {/* <h2 className="catalog-heading mb-5">
              {searchTerm ? 'Search Results' : 'All Products'}
            </h2> */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4">
              {renderContent()}
            </div>
            {!searchTerm && hasNextPage && (
              <div className="flex  mt-12">
                <ShowMoreButton
                  label={isFetchingNextPage ? "Loading..." : "Show More"}
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Catalog;
