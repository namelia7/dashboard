import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaSpinner } from "react-icons/fa"; // Menambahkan FaSpinner
import { sendPasswordResetLink } from "../api/auth";
import '../css/login.css'; // Pastikan file CSS ini berisi gaya kustom yang diperlukan

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState(""); // Mengubah maildefault menjadi email agar lebih umum
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); // Mengatur ulang pesan error
    setMessage(""); // Mengatur ulang pesan sukses
    setLoading(true);

    try {
      const data = await sendPasswordResetLink(email); // Menggunakan state email
      setLoading(false);
      if (data.message) {
        setMessage(data.message); // Menampilkan pesan sukses dari API
      } else {
        // Fallback jika API tidak mengembalikan 'message' tapi tidak sukses
        setError("Gagal mengirim tautan reset kata sandi."); // Diterjemahkan
      }
    } catch (error) {
      setLoading(false);
      console.error("Error saat reset kata sandi:", error); // Diterjemahkan
      // Penanganan error dari respons API yang lebih spesifik jika ada
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi."); // Diterjemahkan
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4"> {/* Menambahkan padding horizontal */}
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg max-w-sm w-full"> {/* Mengurangi max-w-md menjadi max-w-sm untuk form yang lebih ringkas */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center"> {/* Mengurangi ukuran font h1 */}
          Lupa Kata Sandi? {/* Diterjemahkan dari 'Mot de passe oublié ?' */}
        </h1>
        <form className="space-y-6" onSubmit={handleForgotPassword}>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email} // Menggunakan state email
              onChange={(e) => setEmail(e.target.value)} // Menggunakan setEmail
              className="w-full h-12 px-4 pr-10 bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-base" // Penyesuaian padding, placeholder, dan ukuran teks
              placeholder="Masukkan email Anda" // Diterjemahkan dari 'Entrez votre email'
              required // Menambahkan atribut required
            />
            <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /> {/* Penyesuaian posisi ikon */}
          </div>

          {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>} {/* Warna teks error yang lebih terang */}
          {message && <p className="text-green-400 text-sm text-center mt-2">{message}</p>} {/* Warna teks sukses yang lebih terang */}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-lg font-medium uppercase rounded-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" // Penyesuaian padding, disabled state
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Mengirim... {/* Menggunakan FaSpinner dan teks loading */}
              </>
            ) : (
              "Kirim Tautan Reset" // Diterjemahkan dari 'Envoyer le lien de réinitialisation'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-full py-3 mt-4 bg-gray-600 text-white text-lg font-medium rounded-full hover:bg-gray-700 transition duration-300" // Penyesuaian padding
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Login {/* Diterjemahkan dari 'Retour à la connexion' */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;