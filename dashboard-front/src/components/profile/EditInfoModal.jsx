import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { changePassword } from '../../api/auth';

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Fungsi untuk menangani penyimpanan perubahan kata sandi
  const handleSave = async () => {
    // Reset pesan error dan sukses sebelumnya
    setError('');
    setSuccessMessage('');

    // Validasi: periksa apakah kata sandi baru dan konfirmasi cocok
    if (newPassword !== confirmPassword) {
      setError('Kata sandi baru tidak cocok dengan konfirmasi.'); // Diterjemahkan
      return;
    }

    // Validasi: pastikan kata sandi baru tidak kosong
    if (!newPassword || newPassword.length < 8) { // Tambahkan validasi panjang minimal
      setError('Kata sandi baru minimal 8 karakter.'); // Pesan validasi tambahan
      return;
    }

    setLoading(true); // Aktifkan status loading

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Token otentikasi tidak ditemukan. Silakan login kembali.'); // Diterjemahkan
      }

      const data = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      };

      const response = await changePassword(data, token);

      // Tangani respons dari backend
      if (response && response.message) {
        setSuccessMessage(response.message); // Gunakan pesan dari backend jika ada
      } else {
        setSuccessMessage('Kata sandi berhasil diubah!'); 
      }

      // Tutup modal setelah pesan sukses ditampilkan selama 2 detik
      setTimeout(() => {
        onClose();
        // Reset form setelah sukses
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err) {
      console.error("Kesalahan saat mengubah kata sandi:", err); // Diterjemahkan
      // Tangani error dari respons API
      if (err.response && err.response.data && err.response.data.message) {
        // Jika ada pesan error spesifik dari backend Laravel (misal: "current password is incorrect")
        setError(err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // Jika ada error validasi dari Laravel
        const errorMessages = Object.values(err.response.data.errors).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('Terjadi kesalahan saat mengubah kata sandi. Silakan coba lagi.'); // Diterjemahkan, pesan error umum
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4 sm:p-6"> {/* Z-index, opacity, padding responsif */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100"> {/* Max-width, shadow, transition */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Ubah Kata Sandi
        </h3>

        {/* Area pesan sukses/error */}
        {successMessage && <p className="text-green-600 text-base mb-4 text-center font-medium">{successMessage}</p>} {/* Warna hijau lebih gelap, font-medium */}
        {error && <p className="text-red-600 text-base mb-4 text-center font-medium">{error}</p>} {/* Warna merah lebih gelap, font-medium */}

        {/* Input untuk kata sandi saat ini */}
        <div className="mb-5"> {/* Margin lebih besar */}
          <label htmlFor="current-password" className="block text-sm font-semibold text-gray-700 mb-2">
            Kata Sandi Saat Ini
          </label>
          <div className="relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed" // Padding, border, shadow, focus, placeholder, disabled state
              placeholder="Masukkan kata sandi Anda saat ini" // Diterjemahkan
              disabled={loading}
              autoComplete="current-password" // Autocompletion hint
            />
            <button
              type="button"
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1" // Focus ring, padding pada tombol ikon
              aria-label={currentPasswordVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {currentPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Input untuk kata sandi baru */}
        <div className="mb-5">
          <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-2">
            Kata Sandi Baru
          </label> 
          <div className="relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Masukkan kata sandi baru Anda" 
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
              aria-label={newPasswordVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {newPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Input untuk konfirmasi kata sandi baru */}
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-2">
            Konfirmasi Kata Sandi Baru
          </label> 
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10 text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Konfirmasi kata sandi baru Anda" 
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
              aria-label={confirmPasswordVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {confirmPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-3"> 
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-base font-medium" // Warna tombol cancel, padding, focus ring
            disabled={loading}
          >
            Batal
          </button> 
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base font-medium" // Warna tombol save, padding, focus ring
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;