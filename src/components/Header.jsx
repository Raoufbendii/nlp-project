import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";  // Import Firebase auth

const Header = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout Error:", error));
  };
  return (
    <header className="fixed top-0 left-0 w-full px-8 py-4 flex items-center justify-between z-50 backdrop-blur-md bg-white/8">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      <div className="flex items-center space-x-6 rtl:space-x-reverse ml-auto text-lg font-medium transform scale-[0.9]">
        <nav className="flex space-x-6 rtl:space-x-reverse">
          <Link to="/" className="text-black hover:text-orange-500">الرئيسية</Link>
          <Link to="/#blog" className="text-black hover:text-orange-500">المدونة</Link>
          <Link to="/#about" className="text-black hover:text-orange-500">حول</Link>
        </nav>

       {/* Auth Button */}
      {isUserLoggedIn ? (
        <button
          onClick={handleLogout}
          className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          تسجيل الخروج
        </button>
      ) : (
        <Link
          to="/login"
          className="border-2 border-black text-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition"
        >
          تسجيل الدخول
        </Link>
      )}
      </div>
    </header>
  );
};

export default Header;
