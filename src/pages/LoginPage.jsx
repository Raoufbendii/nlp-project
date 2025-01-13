import React, { useState } from "react";
import HeaderLS from "../components/HeaderLS";
import InputField from "../components/InputField";
import ActionButton from "../components/ActionButton";
import HeroSectionLS from "../components/HeroSectionLS";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("تم تسجيل الدخول بنجاح!");
      navigate("/search");
    } catch (error) {
      alert(`فشل تسجيل الدخول: ${error.message}`);
      console.error("Login Error:", error);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col"
      style={{ backgroundImage: "url('/background-2.png')" }}
    >
      <HeaderLS authState={2} />
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center px-8">
        <div className="w-full max-w-lg text-center mb-8 lg:mb-0 lg:mr-8">
          <HeroSectionLS />
        </div>

        <div className="w-full max-w-md space-y-6 text-right lg:justify-center lg:flex lg:flex-col">
          <InputField
            icon="email"
            placeholder="أدخل بريدك الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon="lock"
            placeholder="أدخل كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <ActionButton text="تسجيل الدخول" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
