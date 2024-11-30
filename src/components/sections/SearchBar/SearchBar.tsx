import { IoIosSearch } from "react-icons/io";
import React from 'react';
import { useSearch } from '@/hooks/useSearch';
const SearchBar = () => {

// import ProductCard from '@/components/cards/ProductCard/ProductCard';

  const {
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    searchProducts,
    searchedProducts,
  } = useSearch();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts();
  };
  // Debug logging
  console.log('Searched products:', searchedProducts);
  console.log('Is Loading:', isLoading);
  console.log('Error:', error);
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center gap-2 pt-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search preferred product..."
            className="border p-2 pl-7 rounded md:w-[497px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoIosSearch className="absolute top-3 left-2 text-gray-500" />
        </div>
        <button
          type="submit"
          className="ml-2 bg-[#004C4C] text-white px-5 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default SearchBar;
