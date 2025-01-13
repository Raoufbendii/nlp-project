import React from "react";

const HeroSection = () => {
  return (
    <div className="text-center my-8">
      {/* Replaced the h1 tags with the image */}
      <img
        src="/helloNoon.png" // Replace with the correct path to your image
        alt="مرحبًا بكم في NoonToon"
        className="mx-auto w-auto h-24" // Adjust width and height as needed
      />
      <p className="text-lg mt-4 text-[#55210E]">
        دع عالم نون تون يصنع لطفلك تجربة مشاهدة ممتعة وآمنة
      </p>
     
    </div>
  );
};

export default HeroSection;
