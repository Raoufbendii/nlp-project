import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RecommendedVignettes from "../components/RecommendedVignettes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

// Define genresList
const genresList = [
  "Action", "Adventure", "Biography", "Comedy", "Crime", "Drama", "Educational",
  "Family", "Fantasy", "History", "Horror", "Islamic", "Music", "Musical", "Mystery",
  "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western", "Animation",
];

const ResultPage = () => {
  const location = useLocation();
  const searchData = location.state?.searchData; // Get searchData from location state
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(searchData?.selectedGenres || []); // Pre-fill with the selected genres
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Define toggleGenre
  const toggleGenre = (genre) => {
    setSelectedGenres((prevGenres) => {
      const updatedGenres = prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre];
      return updatedGenres;
    });
  };

  // API request function
  const fetchRecommendations = async (payload) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/recommendations/", payload);
      if (response.data.status === "success" && Array.isArray(response.data.recommendations)) {
        setRecommendations(response.data.recommendations);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError(error.response?.data?.detail || "حدث خطأ أثناء جلب التوصيات. يرجى المحاولة مرة أخرى.");
    }
  };

  const getRecommendations = useCallback(async () => {
    if (!searchData) return;
    setLoading(true);
    setError(null);
  
    const genresToSend = selectedGenres.length === 0 ? ['Comedy'] : selectedGenres;
  
    const payload = {
      content_type: searchData.selectedOption,
      genres: genresToSend,
      age: searchData.childAge ? parseInt(searchData.childAge) : undefined,
    };

    console.log("API Payload:", payload);
    await fetchRecommendations(payload);
    setLoading(false);
  }, [searchData, selectedGenres]);

  // Ensure getRecommendations is called when the component mounts or when searchData/selectedGenres change
  useEffect(() => {
    getRecommendations(); // Call the function here to trigger fetching recommendations
  }, [getRecommendations]); // Add it to the dependency array if it's defined outside the effect

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <Header isUserLoggedIn={isUserLoggedIn} />
      <div className="bg-white shadow-md rounded-lg py-4 px-6 mb-6 text-right max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">تصفية حسب النوع</h2>
        <div className="flex flex-wrap gap-2 justify-end">
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm ${selectedGenres.includes(genre) ? "bg-orange-400 text-white" : "bg-white-200 border-2 border-orange-400 text-orange-600 hover:bg-orange-400 hover:text-white"}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-right">النتائج</h1>
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-2">جاري تحميل البيانات...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-4 text-right">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-6">
          {!loading && recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <RecommendedVignettes
                key={recommendation.index}
                {...recommendation}
              />
            ))
          ) : (
            !loading && <p className="text-center text-gray-600">لا توجد نتائج لعرضها.</p>
          )}
        </div>
      </div>
      <div className="text-center mt-6 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          العودة
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
