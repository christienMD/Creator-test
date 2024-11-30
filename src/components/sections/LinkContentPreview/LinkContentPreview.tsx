import { Link2, ExternalLink } from "lucide-react";

interface Props {
  bannerImage?: string;
  description: string;
}

export const LinkContentPreview = ({
  bannerImage,
  description,
}: Props) => {
  return (
    <div className="relative h-full w-full bg-gray-50">
      {bannerImage ? (
        <img
          src={bannerImage}
          alt={description}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-30">
        <div className="h-full flex flex-col items-center justify-center p-4">
          <Link2 className="h-8 w-8 text-white mb-2" />
          <p className="text-white text-sm font-medium text-center line-clamp-2">
            {description}
          </p>
          <ExternalLink className="h-4 w-4 text-white mt-2 opacity-75" />
        </div>
      </div>
    </div>
  );
};
