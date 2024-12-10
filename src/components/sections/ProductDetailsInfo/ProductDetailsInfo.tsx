import { Creator, Rating, Category } from "@/types/entities";
import { ReactNode } from "react";

interface ProductDetails {
  title: string;
  description: ReactNode;
  ratings?: Rating[];
  category: Category;
  creator: Creator;
}

const ProductDetailsInfo: React.FC<ProductDetails> = ({
  category,
  description,
  title,
}) => {
  return (
    <div className="w-full mt-4 sm:mt-6 lg:col-span-4 bg-gray-50">
      <div className="w-full rounded-md p-3 sm:p-4 md:p-6">
        <div className="">
          <div className="flex flex-wrap items-center gap-2 sm:gap-[14px]">
            <p className="text-lg sm:text-xl md:text-2xl font-medium capitalize">
              Product Category
            </p>
            <span className="text-lg sm:text-xl">&gt;</span>
            <p className="text-lg sm:text-xl md:text-2xl">{category.name}</p>
          </div>

          <h1 className="text-lg sm:text-xl font-bold mt-3">{title}</h1>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: description as string }}
        />
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
