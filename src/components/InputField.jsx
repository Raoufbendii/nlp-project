import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const InputField = ({ icon, placeholder, type, value, onChange }) => {
  const renderIcon = () => {
    switch (icon) {
      case "user":
        return <FaUser className="text-gray-500" />;
      case "email":
        return <FaEnvelope className="text-gray-500" />;
      case "lock":
        return <FaLock className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {renderIcon()}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white bg-opacity-60 border border-gray-300 text-gray-800 placeholder-gray-500 px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
        style={{ borderRadius: "18px" }}
      />
    </div>
  );
};

export default InputField;
