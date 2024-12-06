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
    <div className="w-full mt-4 sm:mt-6 lg:col-span-4">
      <div className="w-full bg-[#F0FFFF] rounded-md">
        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-[14px]">
            <p className="text-lg sm:text-xl md:text-2xl font-medium capitalize">
              Product Category
            </p>
            <span className="text-lg sm:text-xl">&gt;</span>
            <p className="text-lg sm:text-xl md:text-2xl">{category.name}</p>
          </div>

          <h1 className="text-lg sm:text-xl font-bold mt-3">{title}</h1>
        </div>

        <div className="tox-tinymce  p-3 sm:p-4 md:p-6 mt-3 text-base sm:text-lg md:text-xl font-normal text-[#393939] bg-white rounded-b-md">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
