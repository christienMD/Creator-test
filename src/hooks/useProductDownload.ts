// import { useQuery } from '@tanstack/react-query';
// import { useApi } from '@/utils/fetcher';
// import { Product, Media, AuthUser } from '@/types/entities';
// import { useState } from 'react';

// export const useProductDownload = (productId: number) => {
//   const { API } = useApi();

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [user, setUser] = useState<AuthUser | null>(null);
//   // Store auth data
//   const token = localStorage.getItem('auth_token');
//   console.log('token =========> ', token);

//   const { data, isLoading, error } = useQuery<Product, Error>({
//     queryKey: ['product-download', productId],
//     queryFn: async () => {
//       if (!productId) {
//         throw new Error('Product ID is required');
//       }
//       const response = await API.downloadProducts(productId);
//       return response;
//     },
//     // Prevent automatic refetching
//     refetchOnWindowFocus: false,
//     // Only run the query when productId is present
//     enabled: !!productId,
//     // Keep data fresh for 5 minutes
//     staleTime: 5 * 60 * 1000,
//   });

//   // Find downloadable media across product and product items
//   const findDownloadableMedia = (): Media | null => {
//     // Check product media first
//     const productMedia = data?.relationships.media ?? [];
//     if (productMedia.length > 0) {
//       return productMedia[0];
//     }

//     // Then check product items
//     const productItems = data?.relationships.product_items ?? [];
//     for (const item of productItems) {
//       const itemMedia = item.relationships?.media ?? [];
//       if (itemMedia.length > 0) {
//         return itemMedia[0];
//       }
//     }

//     return null;
//   };

//   // Trigger download method
//   const triggerDownload = () => {
//     const downloadMedia = findDownloadableMedia();

//     if (!downloadMedia) {
//       console.error('No downloadable media found for this product');
//       alert('No downloadable files available for this product');
//       return;
//     }

//     // Create download link
//     const link = document.createElement('a');
//     link.href = downloadMedia.original_url;
//     link.download =
//       downloadMedia.file_name || `${data?.title || 'product'}_download`;

//     // Set attributes for better download experience
//     link.setAttribute('target', '_blank');
//     link.setAttribute('rel', 'noopener noreferrer');

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Check if any downloadable media exists
//   const hasDownloadableMedia = () => {
//     // Check product media
//     if (data?.relationships.media && data.relationships.media.length > 0) {
//       return true;
//     }

//     // Check product items media
//     return (data?.relationships.product_items ?? []).some(
//       (item) => item.relationships?.media && item.relationships.media.length > 0
//     );
//   };

//   return {
//     product: data,
//     triggerDownload,
//     isLoading,
//     error,
//     hasDownloadableMedia: hasDownloadableMedia(),
//   };
// };
