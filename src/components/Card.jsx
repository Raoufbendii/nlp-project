import React from "react";

const Card = ({ title, image, rating, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center bg-white shadow-md rounded-xl overflow-hidden p-0 border-2 transition transform hover:scale-105"
      style={{ width: "210px" }}
    >
      {/* Image Section */}
      <div className="w-full h-60">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      {/* Title Section */}
      <div className="w-full bg-white p-2 text-center">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {/* Star Rating */}
        <div className="flex items-center justify-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`text-yellow-500 ${
                index < Math.floor(rating)
                  ? "fas fa-star"
                  : index < rating
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default Card;
