import React from "react";
import SignupForm from "../components/SignupForm";
import signinImage from "../assets/images/signin.jpg"; // Pastikan path gambar sudah benar

const SignupPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Bagian Kiri: Formulir Pendaftaran */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex flex-col justify-center items-center p-6 sm:p-8">
          <SignupForm />
        </div>

        {/* Bagian Kanan: Informasi Login */}
        <div className="w-full md:w-1/2 bg-white text-indigo-600 flex flex-col justify-center items-center p-6 sm:p-8">
          <div className="w-full px-4 mb-6 hidden md:block">
            <img src={signinImage} alt="Masuk" className="max-w-full h-auto" />
          </div>
          <div className="flex flex-col justify-between items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Sudah punya akun?
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              Masuk untuk mengakses akun Anda.
            </p>
            <a
              href="/login"
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition duration-300 ease-in-out block w-full max-w-xs"
            >
              Masuk Sekarang!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;