import React from "react";

const SearchInput = ({ handleSearch }) => {
  return (
    <input
      type="text"
      className="border-2 border-gray-300 p-2 w-[80%] lg:w-auto"
      placeholder="Search"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchInput;
