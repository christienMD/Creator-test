import { useNavigate } from 'react-router-dom';
// import ProductCard from '@/components/cards/ProductCard/ProductCard';
import { ProductCardSkeleton } from '@/components/cards/ProductCardSkeleton/ProductCardSkeleton';
import PublicPageLayout from '@/components/layouts/PublicPageLayout';
import ShowMoreButton from '@/components/sections/ShowMoreButton/ShowMoreButton';
// import Sidemenu from '@/components/sections/SideMenu/Sidemenu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePurchasedProducts } from '@/hooks/usePurchasedProducts';
import { Button } from '@/components/ui/button';
import MyContentProductCard from '@/components/sections/MyContentProductCard/MyContentProductCard';
// import { toast } from '@/components/ui/

function MyContentPage() {
  // Store auth data
  const token = localStorage.getItem('auth_token');
  console.log('token =========> ', token);

  const navigate = useNavigate();

  const {
    purchases,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePurchasedProducts(token ?? '');

  console.log('purchase items =============>', purchases);

  // Enhanced error handling with logging
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : null;

  const handleClick = () => {
    navigate('/catalog');
  };

  // Debugging view for authentication issues
  if (!token) {
    return (
      <PublicPageLayout>
        <div className="container mx-auto px-6 py-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">
                Authentication Issue Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Authentication details are missing:
                </p>
                <pre className="bg-gray-100 p-4 rounded text-left">
                  {JSON.stringify(
                    {
                      tokenPresent: !!token,
                      errorMessage,
                    },
                    null,
                    2
                  )}
                </pre>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => navigate('/login')}>
                    Go to Login
                  </Button>
                  <Button variant="destructive">Force Logout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PublicPageLayout>
    );
  }

  // Handle specific error scenarios
  if (errorMessage === 'Authentication error: unauthenticated') {
    return (
      <PublicPageLayout>
        <div className="container mx-auto px-6 py-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">
                Session Expired
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your session has expired. Please log in again to continue.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => navigate('/login')}>Go to Login</Button>
                <Button variant="destructive">Logout</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PublicPageLayout>
    );
  }

  // Regular rendering logic
  return (
    <PublicPageLayout>
      <h1 className="catalog-heading mb-5 p-10 section-container">
        My Content{' '}
      </h1>
      <main className="container mx-auto px-6 flex-grow flex flex-col lg:flex-row mt-4">
        {/* <div className="lg:sticky top-5 lg:w-[280px] lg:flex-shrink-0">
          <Sidemenu />
        </div> */}
        <div className="flex-grow ml-0 lg:ml-6 mb-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4">
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
          ) : purchases && purchases.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:g-4">
              {purchases.map((product) => (
                <MyContentProductCard
                  key={product.id}
                  product={product}
                  creator={product.relationships.creator}
                  category={product.relationships.category}
                />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">
                  No Products Purchased
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  You haven't purchased any products yet. Browse our catalog and
                  make a purchase to access your content.
                </p>
                <ShowMoreButton
                  label="View Full Catalog"
                  onClick={handleClick}
                  className="mt-4"
                />
              </CardContent>
            </Card>
          )}
          {purchases.length >= 12 && (
            <ShowMoreButton
              label={isFetchingNextPage ? 'Loading...' : 'Show More'}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || !hasNextPage}
              className="mt-4"
            />
          )}
        </div>
      </main>
    </PublicPageLayout>
  );
}

export default MyContentPage;
