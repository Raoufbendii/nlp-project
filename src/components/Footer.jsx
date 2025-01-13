import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">NoonToon</h1>
        <p className="text-lg leading-relaxed mb-8">
          هو منصة مبتكرة تهدف إلى تقديم توصيات مخصصة لبرامج الأطفال العربية التي تتماشى مع القيم
          الإسلامية. تهدف إلى مساعدة الآباء والأمهات على اختيار محتوى آمن وتعليمي وممتع لأطفالهم.
          بفضل تقنيات الذكاء الاصطناعي، يوفر "نون تون" تجربة سهلة ومتميزة لاكتشاف أفضل العروض
          التي تلبي احتياجات الأطفال وتدعم تطورهم الأخلاقي والتعليمي.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto text-sm text-gray-400 space-y-4 md:space-y-0">
        <p>05678934586</p>
        <p>NoonToon-contact@gmail.com</p>
        <p>&copy; 2025 NoonToon</p>
      </div>
    </footer>
  );
};

export default Footer;
