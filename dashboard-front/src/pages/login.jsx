// src/pages/login.jsx
import React from "react";
import LoginForm from "../components/LoginForm";
import loginImage from "../assets/images/login.jpg";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Bagian Kiri: Formulir Login */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center p-6 sm:p-8">
          <LoginForm />
        </div>

        {/* Bagian Kanan: Informasi Pendaftaran */}
        <div className="w-full md:w-1/2 bg-white text-indigo-600 flex flex-col justify-center items-center p-6 sm:p-8">
          <div className="w-full px-4 mb-6 hidden md:block">
            <img src={loginImage} alt="Login" className="max-w-full h-auto" />
          </div>
          <div className="flex flex-col justify-between items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Belum punya akun?
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              Buat akun untuk mengakses semua fitur kami.
            </p>
            <a
              href="/signup"
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition duration-300 ease-in-out block w-full max-w-xs"
            >
              Daftar Sekarang!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;