import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardSkeleton = () => {
  return (
    <div className="sm:p-0 mt-3 w-full">
      {/* Content Preview Skeleton */}
      <div className="h-32 w-full">
        <Skeleton height="100%" />
      </div>

      {/* Title Skeleton */}
      <div className="my-2">
        <Skeleton height={16} width="80%" />
      </div>

      {/* Creator Info Skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <Skeleton circle width={28} height={28} />
        <Skeleton width={100} height={16} />
      </div>

      {/* Ratings Skeleton */}
      <div className="flex items-center mb-2">
        <Skeleton width={150} height={16} />
      </div>

      {/* Price Skeleton */}
      <div className="mb-2">
        <Skeleton width={80} height={16} />
      </div>

      {/* Buttons Skeleton */}
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <Skeleton height={40} />
        </div>
        <div className="flex-shrink-0">
          <Skeleton circle width={30} height={30} />
        </div>
      </div>
    </div>
  );
};
