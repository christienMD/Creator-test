import { Archive } from "lucide-react";

interface Props {
  title: string;
  bannerImage?: string;
}

export const ZipContentPreview = ({
  title,
  bannerImage,
}: Props) => {
  return (
    <div className="relative h-full w-full bg-gray-50">
      {bannerImage ? (
        <img
          src={bannerImage}
          alt={title}
          className="w-full h-full object-cover opacity-75"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <Archive className="h-8 w-8 text-gray-600 mb-2" />
        <p className="text-gray-800 text-sm font-medium text-center line-clamp-2">
          {title}
        </p>
        <span className="text-xs text-gray-500 mt-1">ZIP Archive</span>
      </div>
    </div>
  );
};
