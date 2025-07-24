<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Laravel\Sanctum\HasApiTokens; // Ini sepertinya tidak digunakan secara langsung di sini, tapi tidak ada masalah
use Illuminate\Validation\ValidationException; // Ini juga sepertinya tidak digunakan secara langsung

class AuthController extends Controller
{
    /**
     * Mendaftarkan pengguna baru.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Pengguna berhasil dibuat!', // Diterjemahkan dari 'Utilisateur crée avec succès!'
        ], 201);
    }

    /**
     * Mengautentikasi pengguna dan mengembalikan token API.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'token' => $token,
            ]);
        }

        return response()->json([
            'message' => 'Email atau kata sandi salah.', // Diterjemahkan dari 'Email ou mot de passé incorrect.'
        ], 401);
    }

    /**
     * Melakukan logout pengguna dengan mencabut token saat ini.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Mencabut token akses saat ini dari pengguna yang terautentikasi
        $request->user()->currentAccessToken()->delete();
    
        return response()->json(['message' => 'Logout berhasil'], 200); // Diterjemahkan dari 'Déconnexion réussie'
    }
    
    /**
     * Mengirim tautan reset kata sandi ke email pengguna.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    
        $status = Password::sendResetLink($request->only('email'));
    
        return $status == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Email dengan tautan reset telah dikirimkan kepada Anda. Jika tidak ditemukan, mohon periksa folder spam Anda.']) // Diterjemahkan dan disempurnakan
            : response()->json(['message' => 'Gagal mengirim tautan reset'], 400); // Diterjemahkan
    }
    
    /**
     * Mengatur ulang kata sandi pengguna.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|confirmed',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );
    
        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Kata sandi berhasil diubah!']) // Diterjemahkan dari 'Mot de passe modifié avec succès!'
            : response()->json(['message' => 'Gagal mereset kata sandi'], 400); // Diterjemahkan
    }
}