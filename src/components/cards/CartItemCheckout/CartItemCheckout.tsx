import React from "react";
// icon for the type of product
import { GrDocumentPdf } from "react-icons/gr";
import { CiImageOn, CiVideoOn, CiLink } from "react-icons/ci";
import { AiOutlineAudio } from "react-icons/ai";

interface CartItemCardProps {
  image: string;
  title: string;
  price: number;
  onDelete?: () => void;
}

const getIconComponent = (imageUrlOrLink: string) => {
  if (imageUrlOrLink.endsWith(".pdf")) {
    return (
      <GrDocumentPdf
        className="absolute top-[11px] left-[17px]"
        size={40}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith(".jpg") ||
    imageUrlOrLink.endsWith(".jpeg") ||
    imageUrlOrLink.endsWith(".png")
  ) {
    return (
      <CiImageOn
        className="absolute top-[11px] left-[17px]"
        size={40}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith(".mp4") ||
    imageUrlOrLink.endsWith(".mov")
  ) {
    return (
      <CiVideoOn
        className="absolute top-[11px] left-[17px]"
        size={40}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith(".mp3") ||
    imageUrlOrLink.endsWith(".wav")
  ) {
    return (
      <AiOutlineAudio
        className="absolute top-[11px] left-[17px]"
        size={40}
        color="#004C4C"
      />
    );
  } else if (imageUrlOrLink.startsWith("http")) {
    return (
      <CiLink
        className="absolute top-[11px] left-[17px]"
        size={40}
        color="#004C4C"
      />
    );
  }
  return null;
};

const CartItemCheckout: React.FC<CartItemCardProps> = ({
  image,
  title,
  price,
  
}) => {
  return (
    <div className="sm:flex md:grid md:grid-cols-2 items-center bg-[#FFFBFB] p-4 border-[0.5px] rounded-md border-[#39393980] gap-">
      <div className="relative lg:w-full">
        {getIconComponent(image)}
        <img className="w-[70%] h-[100%] rounded" src={image} alt="" />
      </div>
      <div className="w-full h-full font-medium space-y-4  text-base md:text-base text-[#343434]">
        <h3 className="pr-2 gap-[10px]">{title}</h3>
        <p className="text-nowrap ml-0 text-xl text-[#000000]">{price} FCFA</p>
      </div>
    </div>
  );
};

export default CartItemCheckout;
