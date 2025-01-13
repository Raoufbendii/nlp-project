import React, { useState } from "react";

const GenreSelect = ({ genres, onSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    onSelect(genre); // Callback to parent with selected genre
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {genres.map((genre, index) => (
        <button
          key={index}
          onClick={() => handleGenreClick(genre)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${
            selectedGenre === genre
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black hover:bg-orange-400 hover:text-white"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;
