import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Video,
  Music,
  BookOpen,
  Image,
  Layers,
  Link,
  Archive,
} from "lucide-react";

const SidemenuSkeleton = () => {
  return (
    <div>
      <div className="lg:hidden mb-4">
        <h1 className="text-xl font-bold mb-4">Categories</h1>
        <Skeleton height={40} />
      </div>
      <div className="w-[260px] px-4 pb-4 hidden lg:block rounded-sm mt-3">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Categories</h1>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Layers className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <Music className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <Image className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <Link className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <Archive className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-gray-700" />
              <Skeleton width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidemenuSkeleton;
