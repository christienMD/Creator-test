import { Media } from "@/types/entities";

export const getMediaByCollection = (media: Media[] | undefined) => {
  if (!media?.length) return {
    banner: undefined,
    thumbnail: undefined,
    preview: undefined,
  };

  return {
    banner: media.find(m => m.collection_name === 'banners')?.original_url,
    thumbnail: media.find(m => m.collection_name === 'thumbnails')?.original_url,
    preview: media.find(m => m.collection_name === 'preview_videos')?.original_url,
  };
};

export const DEFAULT_IMAGE = "/images/default.jpg";