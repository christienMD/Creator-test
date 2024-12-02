import ProductDetailsInfo from "../ProductDetailsInfo/ProductDetailsInfo";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/stores/useProductStore";
import ProductDetailsPreview from "../ProductDetailsPreview/ProductDetailsPreview";

const DetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string; type: string }>();
  const productIdAsNumber = slug ? parseInt(slug, 10) : undefined;
  const products = useProductStore((state) => state.products);
  console.log("produsts: ", products);
  console.log("pr id: ", productIdAsNumber);
  
  // add to cart

  // Fetch products from the store and find the one matching the ID
  const product = useProductStore((state) =>
    state.products.find((productItem) => {
      return productItem.id === productIdAsNumber;
    })
  );

  console.log("pro d: ", product);
  console.log("pro d id: ", product?.id);

  if (!product) {
    return <p>Product Not Found</p>;
  }

  const { price, relationships, title, description } = product;
  // const { creator, category, ratings, product_items, media } = relationships;

  return (
    <div className="relative h-full mx-auto p-4 min-h-screen">
      <div className="w-full lg:h-[348px] bg-[#004C4C] rounded-md mt-4"></div>
      <div className="w-full sm:grid sm:justify-items-center sm:grid-cols-2 lg:grid-cols-6">
        <ProductDetailsInfo
          category={relationships.category}
          title={title}
          description={
            <div dangerouslySetInnerHTML={{ __html: description }} />
          }
          // ratings={ratin}
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
