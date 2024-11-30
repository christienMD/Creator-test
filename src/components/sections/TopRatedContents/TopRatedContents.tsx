import ProductCard from "@/components/cards/ProductCard/ProductCard";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardSkeleton } from "@/components/cards/ProductCardSkeleton/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";

const TopRatedContents = () => {
 const { products, isLoading, error } = useProducts();
 const [searchParams] = useSearchParams();
 const category = searchParams.get("category");

 if (error) {
   return <div>{error.message}</div>;
 }

 const skeletonArray = Array(12).fill(null);

  return (
    <section className="mt-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-black font-bold mb-6">
        Top Rated Contents
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4">
        {isLoading ? (
          skeletonArray.map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : products?.length ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              creator={product.relationships.creator}
              category={product.relationships.category}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
            <p className="text-gray-600">
              {category
                ? `We couldn't find any ${category} products at the moment. Please check back later or explore other categories.`
                : "No products available at the moment. Please check back later."}
            </p>
          </div>
        )}

      </div>

      {products && products.length > 0 && (
        <ShowMoreButton label="Show More" route="/catalog" className="mt-12" />
      )}
    </section>
  );
};

export default TopRatedContents;
