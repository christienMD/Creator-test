import React, { useEffect, useState } from 'react';
import { TfiCheckBox } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { Category, Media, Product, ProductItem } from '@/types/entities';

import EbookContentPreview from '../EbookContentPreview/EbookContentPreview';
import AudioContentPreview from '../AudioContentPeview/AudioContentPreview';
import { LinkContentPreview } from '../LinkContentPreview/LinkContentPreview';
import { ZipContentPreview } from '../ZipContentPreview/ZipContentPreview';
import useCartStore from '@/stores/useCartStore';
import { VideoContentPreview } from '../VideoContentPreview/VideoContentPreview';
import ImageContentPreview from '../ImageContentPreview/ImageContentPreview';
import {
  DEFAULT_IMAGE,
  getMediaByCollection,
} from '@/utils/getMediaByCollection';
import { CourseContentPreview } from '../CourseContentPreview/CourseContentPreview';

interface ProductDetailsPreviewProps {
  product: Product;
  price: number;
  title: string;
  category: Category;
  product_items: ProductItem[];
  media: Media[];
}

const ProductDetailsPreview: React.FC<ProductDetailsPreviewProps> = ({
  product,
  price,
  category,
  product_items,
}) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const topOffset = 64; // Adjust this based on your navbar height
      setIsFixed(window.scrollY > topOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVideoContent = category.name === 'video';
  const isImageContent = category.name === 'image';
  const isEbookContent = category.name === 'pdf';
  const isAudioContent = category.name === 'audio';
  const isLinkContent = category.name === 'link';
  const isZipContent = category.name === 'zip';
  const isCourseContent = category.name === 'course';
  const media = getMediaByCollection(product.relationships.media);
  console.log('media+++++++++++++ media: ', media);

  // to add to cart
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  return (
    <div
      className={`${
        isFixed ? 'lg:fixed top-16' : 'lg:absolute lg:top-[120px]'
      } right-16 mt-6 w-full lg:w-80 rounded-md bg-[#FFFCFC]`}
    >
      <div className="rounded-md shadow-md">
        {media && (
          <div className="h-32 w-full relative rounded-md border overflow-hidden">
            {isVideoContent && (
              <VideoContentPreview
                previewUrl={media.preview || ''}
                thumbnail={media.thumbnail || DEFAULT_IMAGE}
              />
            )}
            {isImageContent && (
              <ImageContentPreview
                bannerImage={media.banner || DEFAULT_IMAGE}
                altText={product.title}
              />
            )}
            {isEbookContent && (
              <EbookContentPreview
                bannerImage={media.banner || DEFAULT_IMAGE}
                description={product.title}
                altText={product.title}
              />
            )}
            {isAudioContent && (
              <AudioContentPreview
                previewUrl={media.preview || DEFAULT_IMAGE}
                bannerImage={media.banner || DEFAULT_IMAGE}
              />
            )}
            {isLinkContent && (
              <LinkContentPreview
                bannerImage={media.banner || DEFAULT_IMAGE}
                description={product.title}
              />
            )}
            {isZipContent && (
              <ZipContentPreview
                title={product.title}
                bannerImage={media.banner || DEFAULT_IMAGE}
              />
            )}
            {isCourseContent && (
              <CourseContentPreview
                thumbnail={media.thumbnail || DEFAULT_IMAGE}
                previewUrl={media.preview || DEFAULT_IMAGE}
              />
            )}
          </div>
        )}
        <div className="flex flex-col items-center px-10">
          <p className="font-medium text-4xl text-black">{price} FCFA</p>
          <Link to="/checkout" className="w-full group">
            <button
              onClick={() => addProductToCart(product)}
              className="summarybutton bg-[#004C4C] text-white my-[6px]"
            >
              Buy Now
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
          <div className="w-full group">
            <button
              onClick={() => addProductToCart(product)}
              className="summarybutton bg-[#FFFFFF] text-[#7C7C7C] border border-[#7C7C7C80] my-[6px]"
            >
              Add To Cart
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
          <p className="font-semibold text-base text-[#7C7C7C] text-left w-full">
            What's Included
          </p>
          <ul className="text-left w-full text-[#7C7C7C] mb-10">
            {product_items?.map((item) => (
              <li
                className="flex items-center text-xs gap-[10px] p-[5px]"
                key={item.id}
              >
                <TfiCheckBox className="text-[#222222] text-xl" /> {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPreview;
