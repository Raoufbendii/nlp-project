import React from "react";
import { Link } from "react-router-dom";

const HeaderLS = ({ authState }) => {
  return (
    <header className="fixed top-0 left-0 w-full px-8 py-4 flex items-center justify-between z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/logoW.png" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation and Button Section */}
      <div className="flex items-center space-x-6 rtl:space-x-reverse ml-auto text-lg font-medium transform scale-[0.9]">
        <nav className="flex space-x-6 rtl:space-x-reverse">
        <Link to="/" className="text-white hover:text-orange-500">
                  الرئيسية
                </Link>
                <Link to="/#blog" className="text-white hover:text-orange-500">
                  المدونة
                </Link>
                <Link to="/#about" className="text-white hover:text-orange-500">
                  حول
                </Link>
        </nav>

        {/* Conditional Button */}
        {authState === 1 && (
          <a
            href="/login"
            className="border-2 text-white px-4 py-2 rounded-full "
          >
            تسجيل الدخول
          </a>
        )}
        {authState === 2 && (
          <a
            href="/signup"
            className="border-2 text-white px-4 py-2 rounded-full"
          >
            التسجيل
          </a>
        )}
      </div>
    </header>
  );
};

export default HeaderLS;
