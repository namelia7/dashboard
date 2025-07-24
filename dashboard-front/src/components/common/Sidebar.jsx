import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaSignOutAlt, FaChartBar, FaTable } from 'react-icons/fa';
import { logoutUser } from '../../api/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true); // Menampilkan modal konfirmasi
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Menyembunyikan modal konfirmasi
  };

  const handleConfirmLogout = async () => {
    try {
      const data = await logoutUser();
      console.log(data.message || "Logout berhasil."); 
      localStorage.removeItem("auth_token"); // Hapus token otentikasi
      localStorage.removeItem("isLoggedIn"); // Hapus status login
      window.location.href = "/login"; // Arahkan ke halaman login
    } catch (error) {
      console.error("Kesalahan logout:", error); // Diterjemahkan
      alert("Terjadi kesalahan saat logout. Silakan coba lagi."); // Diterjemahkan
    }
  };

  return (
    <>
      {/* Overlay untuk tampilan mobile saat sidebar terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden transition-all duration-300 z-10" // Hanya tampil di md ke bawah
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar itu sendiri */}
      <div
        className={`h-screen w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative absolute top-0 left-0 z-20`}
      >
        {/* Judul Dashboard */}
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-2xl font-semibold">MyDashboard</h1>
        </div>

        {/* Menu Navigasi Utama */}
        <ul className="space-y-3"> 
          <li>
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg group" 
            >
              <FaTachometerAlt className="mr-3 text-xl group-hover:text-blue-400" /> 
              <span className="text-base font-medium">Beranda</span>
            </Link>
          </li>
          <li>
            <Link
              to="/table"
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg group"
            >
              <FaTable className="mr-3 text-xl group-hover:text-blue-400" />
              <span className="text-base font-medium">Tabel</span> 
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg group"
            >
              <FaUser className="mr-3 text-xl group-hover:text-blue-400" />
              <span className="text-base font-medium">Profil</span> 
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-lg group"
            >
              <FaChartBar className="mr-3 text-xl group-hover:text-blue-400" />
              <span className="text-base font-medium">Statistik</span> 
            </Link>
          </li>
        </ul>

        {/* Pemisah */}
        <div className="my-6 border-t border-gray-700"></div> 

        {/* Menu Logout */}
        <ul className="space-y-3">
          <li>
            <button
              onClick={handleLogoutClick}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-red-700 text-white transition-colors duration-200 w-full group" // Menyesuaikan warna hover, lebar penuh, dan group
            >
              <FaSignOutAlt className="mr-3 text-xl group-hover:text-white" /> {/* Ukuran ikon */}
              <span className="text-base font-medium">Keluar</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center p-4"> {/* Meningkatkan opasitas, menambahkan padding */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-sm w-full"> {/* Penyesuaian padding, shadow, max-width */}
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800">
              Apakah Anda yakin ingin keluar?
            </h3> 
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-base font-medium" 
              >
                Ya 
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-base font-medium"
              >
                Tidak 
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;