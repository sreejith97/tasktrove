// FilterOptions.js
import React from "react";
import SearchInput from "./SearchInput";

const FilterOptions = ({
  filteredStatus,
  handleFilterChange,
  handleSearch,
}) => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "deleted", label: "Deleted" },
    { value: "favorite", label: "Favorite" },
  ];

  return (
    <div className="w-full flex lg:flex-row flex-col justify-between items-center gap-4 lg:gap-0">
      <SearchInput handleSearch={handleSearch} />
      <div className="border-2 border-gray-300 p-2 lg:w-[200px] w-[80%]">
        <select
          value={filteredStatus}
          onChange={handleFilterChange}
          className="appearance-none bg-transparent border-none lg:w-[200px] w-[80%]  text-gray-700 focus:outline-none"
        >
          {filterOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className=" py-3  bg-gray-100 hover:bg-gray-200 focus:bg-gray-200"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
