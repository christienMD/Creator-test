import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton/ProductCardSkeleton';
import PublicPageLayout from '@/components/layouts/PublicPageLayout';
import MyContentProductCard from '@/components/sections/MyContentProductCard/MyContentProductCard';
import Sidemenu from '@/components/sections/SideMenu/Sidemenu';
import { useProducts } from '@/hooks/useProducts';

function MyContentPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { products, isLoading, error } = useProducts();
  return (
    <PublicPageLayout>
      <h1 className="catalog-heading mb-5 p-10 section-container">
        My Content{' '}
      </h1>
      <div className="section-container flex">
        <Sidemenu />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4 mb-4">
          {isLoading ? (
            Array(12)
              .fill(null)
              .map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
          ) : products?.length ? (
            products.map((product) => (
              <MyContentProductCard
                key={product.id}
                product={product}
                creator={product.relationships.creator}
                category={product.relationships.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-600">hello something went wrong</p>
            </div>
          )}
        </div>
      </div>
    </PublicPageLayout>
  );
}

export default MyContentPage;
