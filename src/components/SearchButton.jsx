import React from "react";

const SearchButton = ({ text, onClick, searchData }) => {
  return (
    <button
      onClick={onClick}
      disabled={!searchData}
      className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 disabled:bg-gray-300"
    >
      {text}
    </button>
  );
};

export default SearchButton;
