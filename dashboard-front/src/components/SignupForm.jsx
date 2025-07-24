import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa"; // Mengganti FaSync dengan FaSpinner untuk ikon loading yang lebih umum
import { registerUser } from '../api/auth';
import '../css/login.css'; // Pastikan file CSS ini berisi gaya kustom yang diperlukan

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== passwordConfirmation) {
      setError("Kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.success) {
        setSuccessMessage("Pengguna berhasil didaftarkan!");
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect ke halaman login setelah 2 detik
      } else {
        // Asumsi `response.message` berisi detail error dari API
        setError(response.message || "Pendaftaran gagal. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error saat pendaftaran:", error);
      // Penanganan error jaringan atau server
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm px-4"> {/* Menggunakan w-full dan max-w-sm untuk responsivitas */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
        Buat Akun
      </h1>
      <form className="auth-form space-y-4 md:space-y-6" onSubmit={handleSignup}>
        <div className="relative">
          <FaUser className="absolute left-2 top-3 text-white" />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Nama Lengkap"
            required // Menambahkan atribut required
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-white" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Kata Sandi"
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Konfirmasi Kata Sandi"
            required
          />
        </div>

        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        {successMessage && <p className="text-green-300 text-sm mt-2">{successMessage}</p>}


        <button
          className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200 transition duration-300 ease-in-out flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Mendaftar...
            </>
          ) : (
            "Daftar"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;