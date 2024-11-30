import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  VideoCameraIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  PhotoIcon,
  LinkIcon,
  ArchiveBoxIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useCategories } from "@/hooks/useCategories";
import SidemenuSkeleton from "../SidemenuSkeleton/SidemenuSkeleton";

interface IconMap {
  [key: string]: React.FC<React.ComponentProps<"svg">>;
}

const Sidemenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All" // Set default to "All"
  );

  const handleCategoryChange = (categoryName: string) => {
    const category = categories.find(
      (c) => c.name === categoryName.toLowerCase()
    );
    setSelectedCategory(categoryName);
    const newParams = new URLSearchParams(searchParams);
    if (categoryName === "All") {
      newParams.delete("category");
      newParams.delete("id");
    } else {
      newParams.set("category", category?.name || "");
      newParams.set("id", category?.id.toString() || "");
    }
    setSearchParams(newParams);
  };

  const CategoryIcon = ({
    category,
    className,
  }: {
    category: string;
    className: string;
  }) => {
    const iconMap: IconMap = {
      video: VideoCameraIcon,
      audio: MusicalNoteIcon,
      pdf: BookOpenIcon,
      image: PhotoIcon,
      link: LinkIcon,
      zip: ArchiveBoxIcon,
      course: BookOpenIcon,
    };

    const Icon = iconMap[category.toLowerCase()] || Square3Stack3DIcon;
    return <Icon className={className} />;
  };

  if (isLoading) {
    return <SidemenuSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Mobile View */}
      <div className="lg:hidden mb-4">
        <h1 className="text-xl font-bold mb-4">Categories</h1>
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          defaultValue="All"
        >
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="All">
              <div className="flex items-center">
                <Square3Stack3DIcon className="mr-2 h-3.5 w-3.5" />
                All
              </div>
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center">
                  <CategoryIcon
                    category={category.name}
                    className="mr-2 h-3.5 w-3.5"
                  />
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop View */}
      <div className="w-[260px] px-4 pb-4 hidden lg:block rounded-sm mt-3">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Categories</h1>
          <div className="flex flex-col space-y-2">
            <button
              key="all"
              className={`text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${
                selectedCategory === "All"
                  ? "bg-creator-bg-100 font-semibold"
                  : "hover:bg-creator-bg-100 hover:font-bold hover:text-black opacity-80"
              }`}
              onClick={() => handleCategoryChange("All")}
            >
              <Square3Stack3DIcon className="mr-2 h-5 w-5" />
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                className={`text-left py-2 px-4 rounded-md transition-colors duration-200 flex items-center ${
                  selectedCategory ===
                  category.name.charAt(0).toUpperCase() + category.name.slice(1)
                    ? "bg-creator-bg-100 font-semibold"
                    : "hover:bg-creator-bg-100 hover:font-bold hover:text-black opacity-80"
                }`}
                onClick={() =>
                  handleCategoryChange(
                    category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)
                  )
                }
              >
                <CategoryIcon
                  category={category.name}
                  className="mr-2 h-5 w-5"
                />
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
