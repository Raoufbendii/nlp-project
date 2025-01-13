import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ContentOptions from "../components/ContentOptions";
import SearchButton from "../components/SearchButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomePage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const navigate = useNavigate();  // Initialize navigate hook

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (data) => {
    console.log("Data received in HomePage:", data);
    setSearchData(data);  // Update search data state
  };

  const handleSearchAndNavigate = () => {
    if (searchData) {
      navigate("/result", { state: { searchData } }); // Pass searchData to the result page
    }
  };

  return (
    <div className="bg-cover bg-center h-screen overflow-hidden flex flex-col" style={{ backgroundImage: "url('/background.jpg')" }}>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <div className="flex flex-grow items-center justify-center transform scale-[0.9]">
        <div className="text-center py-8 px-4 max-w-2xl">
          <HeroSection />
          <ContentOptions onSearch={handleSearch} />
          <SearchButton
            text="بحث"
            onClick={handleSearchAndNavigate}  // Use handleSearchAndNavigate for navigation
            searchData={searchData}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
