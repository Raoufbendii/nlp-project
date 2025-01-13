import React, { useState, useEffect, useCallback } from "react";
import GenreVignette from "./GenreVignette";

// Mapping Arabic values to English
const content_type = {
  "إسلامي": "Islamic",
  "تعليمي": "Educational",
  "مرح": "Emotional",
  "اجتماعي": "Social",
  "أخلاقي": "Ethical",
};

const genres = [
  { id: 1, value: "Comedy", name: "مرح", image: "/genres/fun.jpg" },
  { id: 2, value: "Music", name: "موسيقى", image: "/genres/fantasy.jpg" },
  { id: 3, value: "Action", name: "أكشن", image: "/genres/action.jpg" },
  { id: 4, value: "Fantasy", name: "خيالي", image: "/genres/edu.jpg" },
  { id: 5, value: "Drama", name: "دراما", image: "/genres/islamic.jpg" },
];

const ContentOptions = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = useState("مرح");
  const [childAge, setChildAge] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Memoize the updateSearchData function to avoid unnecessary re-renders
  const updateSearchData = useCallback(() => {
    const payload = {
      selectedOption: content_type[selectedOption], // Use English for API
      childAge,
      selectedGenre: selectedGenre ? selectedGenre.value : null, // Pass the genre value, not the entire object
    };
    onSearch(payload); // Call parent's onSearch with the updated data
  }, [selectedOption, childAge, selectedGenre, onSearch]); // Include dependencies here

  useEffect(() => {
    updateSearchData();  // Ensure the search data is updated when state changes
  }, [updateSearchData]);  // Trigger effect when updateSearchData changes

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update selected option
  };

  const handleAgeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 18) {
      setChildAge(e.target.value); // Update child age
    } else if (e.target.value === "") {
      setChildAge(""); // Allow clearing the input
    }
  };

  const handleGenreSelect = (id) => {
    const selected = genres.find((genre) => genre.id === id); // Find the selected genre by ID
    setSelectedGenre(selected); // Update selected genre
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-8">
      <label htmlFor="tone" className="font-bold text-black mb-2 w-full text-center">
        ما نوع المحتوى الذي تريد أن يحصل عليه طفلك
      </label>

      <div className="flex justify-center space-x-8">
        {["إسلامي", "تعليمي", "مرح", "اجتماعي", "أخلاقي"].map((option) => (
          <label
            key={option}
            className={`cursor-pointer font-bold ${selectedOption === option ? "underline text-orange-500" : "text-black"}`}
          >
            <input
              type="radio"
              name="content-type"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange} // Handle option change
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="flex flex-col items-center w-full max-w-xs">
        <input
          id="child-age"
          type="text"
          value={childAge}
          onChange={handleAgeChange} // Handle age change
          className="border-2 border-black rounded-[25px] px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 bg-opacity-0 placeholder-black w-40"
          placeholder="أدخل عمر طفلك"
        />
      </div>

      <div className="w-full relative">
        <h2 className="text-center text-black font-bold mb-4">
          اختر نوع البرامج المفضل لديك
        </h2>
        <div className="flex overflow-x-scroll space-x-4 items-center px-4 scrollbar-hide h-48 relative">
          {genres.map((genre) => (
            <GenreVignette
              key={genre.id}
              genre={genre}
              selected={selectedGenre && selectedGenre.id === genre.id} // Check if the genre is selected
              onSelect={handleGenreSelect} // Handle genre selection
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentOptions;
