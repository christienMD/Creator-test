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
}) => {
  

  return (
    <div className="lg:col-span-4 gap-4 mt-6 mr-4">
      <div className="w-full bg-[#F0FFFF]">
        <div className="p-6 rounded-md shadow-md bg-[#F0FFFF] ">
          <nav className="flex items-center font-medium text-xs gap-[14px]">
           <p>Category</p>
           <span>{">"}</span>
           <p>{category.name}</p>
          </nav>
          <p className="font-normal text font-lg text-[#393939]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
