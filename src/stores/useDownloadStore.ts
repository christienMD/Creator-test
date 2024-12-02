// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Product } from '@/types/entities';

// type DownloadState = {
//   downloadedProducts: Product[];
//   lastDownloaded: number | null;
// };

// type DownloadAction = {
//   setDownloadedProducts: (products: Product[]) => void;
//   addDownloadedProduct: (product: Product) => void;
//   removeDownloadedProduct: (productId: string) => void;
//   clearDownloadedProducts: () => void;
// };

// export const useDownloadStore = create<
//   DownloadState & DownloadAction
// >()(
//   persist(
//     (set) => ({
//       downloadedProducts: [],
//       lastDownloaded: null,

//       setDownloadedProducts: (products) => {
//         set({
//           downloadedProducts: products,
//           lastDownloaded: Date.now(),
//         });
//       },

//       addDownloadedProduct: (product) => {
//         set((state) => ({
//           downloadedProducts: [...state.downloadedProducts, product],
//           lastDownloaded: Date.now(),
//         }));
//       },
//     //
//       removeDownloadedProduct: (productId) => {
//         set((state) => ({
//           downloadedProducts: state.downloadedProducts.filter(
//             (product) => product.id !== productId
//           ),
//           lastDownloaded: Date.now(),
//         }));
//       },

//       clearDownloadedProducts: () => {
//         set({
//           downloadedProducts: [],
//           lastDownloaded: null,
//         });
//       },
//     }),
//     {
//       name: 'downloaded-products-storage',
//     }
//   )
// );
