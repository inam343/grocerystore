import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="search bg-[#E6E6E6] h-[36px] w-full rounded-md px-4 relative border border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.5)]">
      <input
        type="text"
        className="h-full w-full outline-none border-0 bg-transparent text-sm pr-7"
        placeholder="Search products..."
      />
      <button>
        <IoIosSearch size={20} className="absolute top-2 right-2 cursor-pointer text-gray-500" />
      </button>
    </div>
  );
};

export default Search;
