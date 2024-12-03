import ProductCard from '@/components/cards/ProductCard/ProductCard';
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton/ProductCardSkeleton';
import { useProducts } from '@/hooks/useProducts';

import { Link } from 'react-router-dom';

const AccessedProducts = () => {
  const { products, isLoading } = useProducts();

  return (
    <div className="section-container">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="heading">Most accessed product</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover the product everyone loves—crafted to perfection, designed
            to meet your needs, and trusted by countless users!
          </p>
        </div>

        <div className="flex justify-center items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10 lg:max-w-5xl md:max-w-4xl sm:max-w-3xl w-full">
            {isLoading ? (
              Array(12)
                .fill(null)
                .map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
            ) : products?.length ? (
              products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    creator={product.relationships.creator}
                    category={product.relationships.category}
                  />
                ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold mb-2">
                  No Products Found
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="show-more-btn text-white">
            <Link to="/catalog">See More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessedProducts;
