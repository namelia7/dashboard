import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"; // FaUser tidak digunakan, bisa dihapus jika tidak perlu
import { loginUser } from '../api/auth';
import '../css/login.css'; // Pastikan file CSS ini berisi gaya kustom yang diperlukan

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
        remember_me: rememberMe,
      });

      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        // Jika API mengembalikan pesan error yang spesifik
        setError(data.message || "Email atau kata sandi salah");
      }
    } catch (error) {
      console.error("Error saat login:", error);

      if (error.response) {
        // Error dari respons server (misal: 400, 401)
        setError(error.response.data.message || "Terjadi kesalahan. Silakan coba lagi.");
      } else {
        // Error jaringan atau lainnya
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-sm px-4"> {/* Menggunakan w-full dan max-w-sm untuk responsivitas */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Selamat Datang!
      </h1>
      <form className="login-form space-y-4" onSubmit={handleLogin}>
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-white" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
            required // Menambahkan atribut required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Kata Sandi"
            required // Menambahkan atribut required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-3 text-white"
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-500 rounded focus:ring-indigo-500 focus:ring-2"
          />
          <label htmlFor="rememberMe" className="ml-2 text-white text-sm">
            Ingat saya
          </label>
        </div>
        {error && <p className="text-red-300 text-sm mt-2">{error}</p>} {/* Warna error lebih terang */}
        <button
          className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200 transition duration-300 ease-in-out flex items-center justify-center" // Menambahkan flex untuk spinner
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Memuat...
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
      <a
        href="#"
        className="block text-center text-sm text-white mt-4 hover:underline"
        onClick={handleForgotPassword}
      >
        Lupa Kata Sandi?
      </a>
    </div>
  );
};

export default LoginForm;