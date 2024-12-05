import React from 'react';
//import { IoIosStar } from "react-icons/io";
import { FaRegTrashAlt } from 'react-icons/fa';
// import { CiHeart } from "react-icons/ci";

// icon for the type of product
import { GrDocumentPdf } from 'react-icons/gr';
import { CiImageOn, CiVideoOn, CiLink } from 'react-icons/ci';
import { AiOutlineAudio } from 'react-icons/ai';

interface CartItemCardProps {
  image: string;
  title: string;
  price: number;
  author: string;
  // rating: number;
  onDelete: () => void;
}

const getIconComponent = (imageUrlOrLink: string) => {
  if (imageUrlOrLink.endsWith('.pdf')) {
    return (
      <GrDocumentPdf
        className="absolute top-[33px] left-[38px]"
        size={50}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith('.jpg') ||
    imageUrlOrLink.endsWith('.jpeg') ||
    imageUrlOrLink.endsWith('.png')
  ) {
    return (
      <CiImageOn
        className="absolute top-[33px] left-[38px]"
        size={50}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith('.mp4') ||
    imageUrlOrLink.endsWith('.mov')
  ) {
    return (
      <CiVideoOn
        className="absolute top-[33px] left-[38px]"
        size={50}
        color="#004C4C"
      />
    );
  } else if (
    imageUrlOrLink.endsWith('.mp3') ||
    imageUrlOrLink.endsWith('.wav')
  ) {
    return (
      <AiOutlineAudio
        className="absolute top-[33px] left-[38px]"
        size={50}
        color="#004C4C"
      />
    );
  } else if (imageUrlOrLink.startsWith('http')) {
    return (
      <CiLink
        className="absolute top-[33px] left-[38px]"
        size={50}
        color="#004C4C"
      />
    );
  }
  return null;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  image,
  title,
  price,
  author,
  // rating,
  onDelete,
}) => {
  return (
    <div className="md:flex items-center h-[30%] bg-[#FFFBFB] p-4 border-[0.5px] rounded-md border-[#39393980] gap-6">
      <div className="relative">
        {getIconComponent(image)}
        <img className="w-auto lg:w-44 rounded" src={image} alt="" />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center py-[10px] md:gap-36 font-medium text-base md:text-xl">
          <h3 className="pr-2">{title}</h3>
          <p className="text-nowrap text-end ml-0">{price} FCFA</p>
        </div>
        <div className="font-normal text-sm">
          <p className="font-medium text-sm">{author}</p>
          <p className="flex items-center">
            {/* Render stars based on the rating
            {Array.from({ length: rating }, (_, index) => (
              <IoIosStar key={index} color="#FFAE00" />
            ))}
            <span className="ml-2">({rating} Ratings)</span> */}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center  "></div>
          <button
            className="flex items-center py-[5px] gap-[10px] font-normal text-xl"
            onClick={onDelete}
          >
            <FaRegTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
