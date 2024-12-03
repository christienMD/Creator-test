import { CourseContentPreview } from '@/components/sections/CourseContentPreview/CourseContentPreview';
import EbookContentPreview from '@/components/sections/EbookContentPreview/EbookContentPreview';
import ImageContentPreview from '@/components/sections/ImageContentPreview/ImageContentPreview';
import { LinkContentPreview } from '@/components/sections/LinkContentPreview/LinkContentPreview';
import { ZipContentPreview } from '@/components/sections/ZipContentPreview/ZipContentPreview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Category, Creator, Product } from '@/types/entities';
import {
  DEFAULT_IMAGE,
  getMediaByCollection,
} from '@/utils/getMediaByCollection';
import { Link } from 'react-router-dom';
import { PurchaseVideoContent } from '../PurchaseVideoContent/PurchaseVideoContent';
// import { useApi } from '@/utils/fetcher';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { PurchaseAudioProduct } from '../PurchaseAudioProduct/PurchaseAudioProduct';
import React from 'react';
// import useCartStore from '@/stores/useCartStore';

interface ProductCardProps {
  product: Product;
  creator: Creator;
  category: Category;
}

const MyContentProductCard = ({
  product,
  creator,
  category,
}: ProductCardProps) => {
  // const { API } = useApi();
  const [isDownloading, setIsDownloading] = useState(false);

  // Store auth data
  const token = localStorage.getItem('auth_token');
  console.log('token =========> ', token);

  const media = getMediaByCollection(product.relationships.media);
  // const getFileExtension = (categoryName: string) => {
  //   switch (categoryName) {
  //     case 'video':
  //       return '.mp4';
  //     case 'audio':
  //       return '.mp3';
  //     case 'pdf':
  //       return '.pdf';
  //     case 'image':
  //       return '.jpg';
  //     case 'zip':
  //       return '.zip';
  //     default:
  //       return '';
  //   }
  // };

  //download mechanism
  // const downloadProduct = async () => {
  //   try {
  //     setIsDownloading(true);

  //     console.log('Attempting to download product:', {
  //       productId: product.id,
  //       token: token ? 'Token Present' : 'No Token',
  //       category: category.name,
  //     });

  //     const response = await API.downloadProducts(product.id, token ?? '');

  //     // Detailed logging of response
  //     console.log('Response Type:', typeof response);
  //     console.log('Response Keys:', Object.keys(response));
  //     console.log('Response Constructor:', response?.constructor?.name);

  //     // Log raw response details
  //     if (response) {
  //       console.log('Full Response Details:', {
  //         status: response.status,
  //         type: response.type,
  //         headers: Object.fromEntries(response.headers?.entries() || []),
  //       });
  //     }
  //   } catch (error) {
  //     toast.error('Download initialization failed');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  // const downloadProduct = async () => {
  //   try {
  //     setIsDownloading(true);

  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/purchases/download/${
  //         product.id
  //       }`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       // Handle error responses
  //       const contentType = response.headers.get('Content-Type');
  //       if (contentType && contentType.includes('application/json')) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || 'Failed to download product');
  //       } else {
  //         throw new Error('Unexpected response from the server');
  //       }
  //     }

  //     // Handle file download
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);

  //     const fileName = JSON.stringify((product.title).zip); // Customize if needed
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = fileName;
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     window.URL.revokeObjectURL(url);

  //     toast.success('Download successful');
  //   } catch (error) {
  //     console.error('Download error:', error);
  //     toast.error('An error occurred while downloading the product');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  const downloadProduct = async () => {
    try {
      setIsDownloading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/purchases/download/${
          product.id
        }`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to download product');
        } else {
          throw new Error('Unexpected response from the server');
        }
      }

      // Get the filename from the Content-Disposition header or generate it
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = `${product.title}.zip`; // Default fallback

      if (contentDisposition) {
        // Extract filename from Content-Disposition header if available
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch) {
          fileName = filenameMatch[1];
        }
      }

      // Sanitize filename to remove invalid characters
      fileName = fileName.replace(/[^a-z0-9._ -]/gi, '_');

      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success('Download successful');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('An error occurred while downloading the product');
    } finally {
      setIsDownloading(false);
    }
  };

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
          <PurchaseVideoContent
            previewUrl={media.preview || DEFAULT_IMAGE}
            thumbnail={media.thumbnail || DEFAULT_IMAGE}
          />
        )}
        {isAudioContent && (
          <PurchaseAudioProduct
            previewUrl={media.preview || DEFAULT_IMAGE}
            bannerImage={media.banner || DEFAULT_IMAGE}
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
      </div>{' '}
      <Link
        to={`/product/${category.name}/${category.id}`}
        className="cursor-pointer"
      >
        <h3 className="text-base font-bold my-2 line-clamp-2 hover:underline">
          {product.title}
        </h3>{' '}
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-9 w-9">
            {creator.profile_pic && (
              <AvatarImage src={creator.profile_pic} alt={creator.name} />
            )}
            <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{creator.name}</p>
        </div>{' '}
        <p className="text-base font-bold mb-2">{product.price} FCFA</p>
      </Link>{' '}
      <div className="flex text-left gap-2">
        <div className="flex-grow">
          <Button
            className="w-full bg-creator-bg-400 hover:bg-creator-bg-400 hover:opacity-75 text-left flex items-center justify-center gap-2"
            onClick={downloadProduct}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MyContentProductCard;
