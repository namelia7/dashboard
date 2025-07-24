import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { resetPassword } from "../api/auth";
import '../css/login.css'; 

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Mengambil token dari URL
  const navigate = useNavigate();

  // State untuk menyimpan nilai input form dan pesan/error
  const [email, setEmail] = useState(""); // Mengubah maildefault menjadi email agar lebih jelas
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Handler untuk proses reset password
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    setError(""); // Mengatur ulang error
    setMessage(""); // Mengatur ulang pesan
    setIsLoading(true); // Mulai loading

    // Validasi sederhana: pastikan kata sandi cocok
    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok."); // Diterjemahkan dari "Les mots de passe ne correspondent pas."
      setIsLoading(false);
      return;
    }

    try {
      // Memanggil fungsi resetPassword dari API
      const data = await resetPassword({ token, email, password, password_confirmation: confirmPassword });
      if (data.message) {
        setMessage(data.message); // Menampilkan pesan sukses dari backend
        // Opsional: kosongkan input setelah sukses
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Mungkin ingin mengarahkan pengguna ke halaman login setelah beberapa detik
        setTimeout(() => {
          navigate("/login");
        }, 3000); 
      } else {
        setError(data.message || "Terjadi kesalahan saat mengatur ulang kata sandi."); 
      }
    } catch (error) {
      console.error("Kesalahan pengaturan ulang kata sandi:", error); 
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = error.response.data.errors;
        const errorMessage = Object.values(backendErrors).flat().join(' ');
        setError(errorMessage);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi."); 
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4"> 
      <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-700"> 
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center"> 
          Atur Ulang Kata Sandi Anda
        </h1> 

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-200" 
              placeholder="Alamat Email Anda" 
              required 
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Alamat Email Anda
            </label> {/* Label floating */}
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-200"
              placeholder="Kata Sandi Baru"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Kata Sandi Baru
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 transition duration-200"
              placeholder="Konfirmasi Kata Sandi"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-0 -top-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-indigo-500 peer-focus:text-sm"
            >
              Konfirmasi Kata Sandi
            </label>
          </div>

          {/* Bagian untuk menampilkan pesan error atau sukses */}
          {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>} 
          {message && <p className="text-green-400 text-sm text-center mt-4">{message}</p>}

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-lg font-bold uppercase rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            disabled={isLoading} // Nonaktifkan tombol saat loading
          >
            {isLoading ? 'Memproses...' : 'Atur Ulang Kata Sandi'} 
          </button>
        </form>

        {/* Tombol Kembali ke Login */}
        <div className="mt-8 text-center"> 
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center w-full py-3 bg-gray-700 text-white text-lg font-medium rounded-full hover:bg-gray-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Halaman Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;