import AudioContentPreview from '@/components/sections/AudioContentPeview/AudioContentPreview';
import { CourseContentPreview } from '@/components/sections/CourseContentPreview/CourseContentPreview';
import EbookContentPreview from '@/components/sections/EbookContentPreview/EbookContentPreview';
import ImageContentPreview from '@/components/sections/ImageContentPreview/ImageContentPreview';
import { LinkContentPreview } from '@/components/sections/LinkContentPreview/LinkContentPreview';
import { VideoContentPreview } from '@/components/sections/VideoContentPreview/VideoContentPreview';
import { ZipContentPreview } from '@/components/sections/ZipContentPreview/ZipContentPreview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Category, Creator, Product } from '@/types/entities';
import {
  DEFAULT_IMAGE,
  getMediaByCollection,
} from '@/utils/getMediaByCollection';
import { Link } from 'react-router-dom';
import useCartStore from '@/stores/useCartStore';

interface Props {
  product: Product;
  creator: Creator;
  category: Category;
}

const ProductCard = ({ product, creator, category }: Props) => {
  // const navigate = useNavigate();
  const media = getMediaByCollection(product.relationships.media);

  // const handleClick = () => {
  //   navigate(`/product/${category.name}/${category.id}`);
  // };
  const { addProductToCart } = useCartStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const isVideoContent = category.name === 'video';
  const isImageContent = category.name === 'image';
  const isEbookContent = category.name === 'pdf';
  const isAudioContent = category.name === 'audio';
  const isLinkContent = category.name === 'link';
  const isZipContent = category.name === 'zip';
  const isCourseContent = category.name === 'course';


  return (
    <div className="sm:p-0 mt-3 w-full">
      <div className="h-32 w-full relative rounded-md border overflow-hidden">
        {isVideoContent && (
          <VideoContentPreview
            previewUrl={media.preview || DEFAULT_IMAGE}
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

      <Link
        to={`/product/${category.name}/${category.id}`}
        className="cursor-pointer"
      >
        {/* content and name title */}
        <h3 className="text-base font-bold my-2 line-clamp-2 hover:underline">
          {product.title}
        </h3>

        {/* user profile image */}
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-9 w-9">
            {creator.profile_pic && (
              <AvatarImage src={creator.profile_pic} alt={creator.name} />
            )}
            <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{creator.name}</p>
        </div>

        {/* price */}
        <p className="text-base font-bold mb-2">{product.price} FCFA</p>
      </Link>

      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <Button
            className="w-full bg-creator-bg-400 hover:bg-creator-bg-400 hover:opacity-75"
            onClick={() => addProductToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
