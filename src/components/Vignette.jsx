const Vignette = ({ title, description, genres, overallScore, fantasyScore, image }) => {
  console.log("Vignette props:", { title, description, genres, overallScore, fantasyScore, image }); // Add this line for debugging

  // Safely access the title
  const displayTitle = title?.Show_Title ? Object.values(title.Show_Title)[0] : "Not available";
  
  // Safely handle genres and fallback to an empty array if undefined
  const genreList = Array.isArray(genres) && genres.length > 0 ? genres.join(", ") : "Not existing";

  // Default image if image is not provided
  const displayImage = image || '/path/to/default-image.jpg'; // Replace with a valid fallback image path

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 mb-6 rtl">
      <div className="flex flex-col-reverse sm:flex-row-reverse">
        <img
          src={displayImage}
          alt={displayTitle} 
          className="w-32 h-48 object-cover rounded-md ml-4 mb-4 sm:mb-0"
        />
        <div className="flex flex-col justify-between text-right w-full">
          <div>
            <h2 className="text-xl font-bold text-[#333]">{displayTitle}</h2>
            <p className="text-sm text-gray-600 mt-2">
              {description || "No description available"}
              <span className="text-blue-500 font-semibold cursor-pointer">...المزيد</span>
            </p>
            <p className="text-gray-800 font-semibold mt-4">
              الأنواع: {genreList}
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-700 font-medium">
              التقييم العام: <span className="font-bold">{overallScore || "N/A"}</span>
              <span className="text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span>
            </p>
            <p className="text-gray-700 font-medium">
              تقييم الخيال: <span className="font-bold">{fantasyScore || "N/A"}</span>
              <span className="text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vignette;
