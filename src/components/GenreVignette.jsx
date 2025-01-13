import React from "react";

const GenreVignette = ({ genre, selected, onSelect }) => {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer border-2 ${
        selected ? "border-orange-600 scale-110" : "border-gray-200"
      } bg-white shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105`}
      style={{
        width: "150px", // Fixed width
        height: "120px", // Fixed height
        borderRadius: "10px",
      }}
      onClick={() => onSelect(genre.id)}
    >
      <div
        className="w-full h-full rounded-md overflow-hidden"
        style={{ borderRadius: "10px" }}
      >
        <img
          src={genre.image}
          alt={genre.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className={`font-bold mt-2 text-center ${
          selected ? "text-orange-500" : "text-black"
        } hover:text-orange`}
      >
        {genre.name}
      </span>
    </div>
  );
};

export default GenreVignette;
