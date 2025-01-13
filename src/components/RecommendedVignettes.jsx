import React from "react";

const RecommendedVignettes = ({
  Show_Title,
  Show_Description,
  YouTube_Playlist_Link,
  Number_of_Episodes,
  Year,
  URL_Picture,
  IMDb_Rating,
  Runtime,
  Title_Type
}) => {
  return (
    <div className="vignette bg-white shadow-md rounded-lg p-6 flex flex-row-reverse gap-6">
      <div className="flex-shrink-0 w-48">
        <img 
          src={URL_Picture || "/default-show.jpg"} 
          alt={Show_Title} 
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="flex-grow text-right">
        <h2 className="text-2xl font-bold mb-3 text-gray-900">{Show_Title}</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{Show_Description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-gray-500">السنة:</span>
            <span className="font-medium mr-2">{Year}</span>
          </div>
          <div>
            <span className="text-gray-500">عدد الحلقات:</span>
            <span className="font-medium mr-2">{Number_of_Episodes}</span>
          </div>
          <div>
            <span className="text-gray-500">مدة الحلقة:</span>
            <span className="font-medium mr-2">{Runtime} دقيقة</span>
          </div>
          <div>
            <span className="text-gray-500">تقييم IMDb:</span>
            <span className="font-medium mr-2">{IMDb_Rating} ⭐</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <a
            href={YouTube_Playlist_Link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            شاهد على YouTube
          </a>
        </div>
      </div>
    </div>
  );
};
export default RecommendedVignettes;