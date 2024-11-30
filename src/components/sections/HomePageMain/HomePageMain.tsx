import ProductCard from "../../cards/ProductCard/ProductCard";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardSkeleton } from "@/components/cards/ProductCardSkeleton/ProductCardSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { useAuthToast } from "@/hooks/useAuthToast";

const pageSize = 1;
const HomePageMain = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id") ?? undefined;
  const category = searchParams.get("category");
  const { products, isLoading, error } = useProducts(pageSize, categoryId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  useAuthToast();

  const handleClick = () => {
    navigate("/catalog");
  };

  if (error) {
    return (
      <div className="px-6">
        <ErrorComponent
          title="Error Loading Products"
          message={
            error?.message ||
            "There was a problem loading the products. Please try again."
          }
        />
      </div>
    );
  }

  return (
    <section>
      {category && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {category.charAt(0).toUpperCase() + category.slice(1)} Products
          </h2>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4">
        {isLoading ? (
          Array(12)
            .fill(null)
            .map((_, index) => (
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

      {products && products.length > 11 && (
        <ShowMoreButton
          label="View Full Catalog"
          onClick={handleClick}
          className="mt-12"
        />
      )}
    </section>
  );
};
export default HomePageMain;
