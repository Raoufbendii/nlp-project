import React from "react";

const ActionButton = ({ text, onClick }) => {
  return (
    <button
    onClick={onClick}
      className="text-white py-3 px-8 rounded-full shadow-md text-lg font-bold hover:opacity-90 transition duration-300 mx-auto"
      style={{ backgroundColor: "#FAC919", maxWidth: "300px" }}
    >
      {text}
    </button>
  );
};

export default ActionButton;




