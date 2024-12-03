import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSingleProduct } from '@/hooks/useSingleProductS';
import ProductDetailsInfo from "../ProductDetailsInfo/ProductDetailsInfo";
import ProductDetailsPreview from "../ProductDetailsPreview/ProductDetailsPreview";

const DetailsPage = () => {
  const { slug } = useParams<{ slug: string; type: string }>();
  const { 
    product, 
    isLoading, 
    error, 
    fetchSingleProduct,
    resetProduct 
  } = useSingleProduct();

  useEffect(() => {
    // Reset product before fetching
    resetProduct();

    // Ensure productIdAsNumber is a valid number
    if (!slug) {
      return;
    }

    const productIdAsNumber = parseInt(slug, 10);

    if (!isNaN(productIdAsNumber)) {
      fetchSingleProduct(productIdAsNumber);
    }

    // Cleanup function
    return () => {
      resetProduct();
    };
  }, [slug, fetchSingleProduct, resetProduct]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#004C4C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found
      </div>
    );
  }

  const { price, relationships, title, description } = product;

  return (
    <div className="relative w-full h-full mx-auto p-4 min-h-screen">
      <div className="w-full lg:h-[348px] bg-[#004C4C] rounded-md mt-4"></div>
      <div className="w-full sm:grid sm:justify-items-center sm:grid-cols-2 lg:grid-cols-6">
        <ProductDetailsInfo
          category={relationships.category}
          title={title}
          description={
            <div dangerouslySetInnerHTML={{ __html: description }} />
          }
          creator={relationships.creator}
        />
        <ProductDetailsPreview
          product={product}
          title={title}
          price={price}
          media={relationships.media}
          product_items={relationships?.product_items}
          category={relationships.category}
        />
      </div>
    </div>
  );
};

export default DetailsPage;