
import ProductDetailsInfo from "../ProductDetailsInfo/ProductDetailsInfo";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import ProductDetailsPreview from "../ProductDetailsPreview/ProductDetailsPreview";

const DetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string; type: string }>();
  const productIdAsNumber = slug ? parseInt(slug, 10) : undefined;

  // add to cart

  // Fetch products from the store and find the one matching the ID
  const product = useProductStore((state) =>
    state.products.find((productItem) => {
      return productItem.id === productIdAsNumber;
    })
  );

  if (!product) {
    return <p>Product Not Found</p>;
  }

  const { price, relationships, title, description } = product;
  const { creator, category, ratings, product_items, media } = relationships;

  return (
    <div className="relative h-full mx-auto p-4 min-h-screen">
      <div className="w-full lg:h-[348px] bg-[#004C4C] rounded-md mt-4"></div>
      <div className="w-full sm:grid sm:justify-items-center sm:grid-cols-2 lg:grid-cols-6">
        <ProductDetailsInfo
          category={category}
          title={title}
          description={description}
          ratings={ratings}
          creator={creator}
          product_items={product_items}
        />
        <ProductDetailsPreview
          product={product}
          title={title}
          price={price}
          media={media}
          product_items={product_items}
          category={category}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
