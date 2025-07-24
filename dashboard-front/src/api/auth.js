import axios from 'axios';

// URL dasar API Anda
const apiUrl = 'http://127.0.0.1:8000/api';

/**
 * Fungsi Registrasi Pengguna
 * Digunakan untuk mendaftarkan pengguna baru ke sistem.
 * @param {object} userData - Data pengguna untuk pendaftaran.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saat pendaftaran:', error);
    throw error;
  }
};

/**
 * Fungsi Login Pengguna
 * Digunakan untuk mengautentikasi pengguna yang sudah terdaftar.
 * @param {object} loginData - Data login (email, password).
 */
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Error saat login:', error);
    throw error;
  }
};

/**
 * Fungsi Mengirim Tautan Reset Kata Sandi
 * Mengirimkan tautan untuk mengatur ulang kata sandi ke email pengguna.
 * @param {string} email - Email pengguna.
 */
export const sendPasswordResetLink = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Error saat mengirim tautan reset kata sandi:", error);
    throw error;
  }
};

/**
 * Fungsi Reset Kata Sandi
 * Digunakan untuk mengatur ulang kata sandi pengguna dengan token yang valid.
 * @param {object} resetData - Data reset kata sandi (email, token, password, password_confirmation).
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await axios.post(`${apiUrl}/reset-password`, resetData);
    return response.data;
  } catch (error) {
    console.error("Error saat mereset kata sandi:", error);
    throw error;
  }
};

/**
 * Fungsi Logout Pengguna
 * Mengakhiri sesi pengguna dengan menghapus token autentikasi.
 */
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Token tidak ditemukan untuk logout.");
    }

    const response = await axios.post(`${apiUrl}/logout`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saat logout:', error);
    throw error;
  }
};

/**
 * Fungsi Mengambil Data Pengguna
 * Mengambil informasi pengguna yang sedang login menggunakan token autentikasi.
 * @param {string} token - Token autentikasi pengguna.
 */
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saat mengambil data pengguna:', error);
    throw error;
  }
};

/**
 * Fungsi Memperbarui Info Pengguna
 * Memungkinkan pengguna untuk memperbarui informasi profil mereka.
 * @param {object} userData - Data pengguna yang akan diperbarui.
 * @param {string} token - Token autentikasi pengguna.
 */
export const updateUserInfo = async (userData, token) => {
  try {
    const response = await axios.put(`${apiUrl}/user/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saat memperbarui informasi:', error);
    throw error;
  }
};

/**
 * Fungsi Mengubah Kata Sandi
 * Memungkinkan pengguna yang sudah login untuk mengubah kata sandi mereka.
 * @param {object} data - Data perubahan kata sandi (old_password, new_password, new_password_confirmation).
 * @param {string} token - Token autentikasi pengguna.
 */
export const changePassword = async (data, token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/user/change-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saat mengubah kata sandi:', error);
    // Memberikan pesan error yang lebih informatif jika tersedia dari respons API
    throw new Error(error.response?.data?.message || 'Error saat mengubah kata sandi.');
  }
};