import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import GenreSelect from "../components/GenreSelect";
import CardGallery from "../components/CardGallery";
import Footer from "../components/Footer";
import Vignette from "../components/Vignette";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const LandingPage = () => {
  const genres = ["أكشن", "دراما", "كوميديا", "خيال", "تعليمي"];
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleGenreSelect = (genre) => setSelectedGenre(genre);

  const handleCardClick = (card) => setSelectedCard(card);

  const closeVignette = () => setSelectedCard(null);

  const handleStartClick = () => {
    navigate(isUserLoggedIn ? "/search" : "/login");
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center min-h-screen flex flex-col justify-between text-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Header isUserLoggedIn={isUserLoggedIn} />
        <div className="flex-grow flex flex-col items-center justify-center">
          <HeroSection />
          <button
            className="mt-6 bg-[#FAC919] text-white px-6 py-3 rounded-full text-lg font-bold shadow-md hover:opacity-90 transition"
            onClick={handleStartClick}
          >
            ابدأ
          </button>
        </div>
      </div>

      {/* Genre Select */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">الأنواع</h2>
          <GenreSelect genres={genres} onSelect={handleGenreSelect} />
        </div>
      </div>

      {/* Card Gallery */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {selectedGenre || "الكل"}
          </h2>
          <CardGallery genre={selectedGenre} onCardClick={handleCardClick} />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Vignette Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeVignette}
            >
              ✖
            </button>
            <Vignette {...selectedCard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
