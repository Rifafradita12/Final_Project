import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Library, LogIn } from "lucide-react";

export default function Landing() {
    return (
        <div className="min-h-screen py-10 bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 text-center">

            {/* TOP LOGO */}
            <div className="mb-10 flex flex-col items-center gap-3">
                <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
                    <BookOpen size={40} className="text-gray-800" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Perpustakaan Digital
                </h1>
                <p className="text-gray-600 max-w-md">
                    Kelola buku, anggota, dan sirkulasi dengan sistem modern yang cepat dan efisien.
                </p>
            </div>

            {/* CARD */}
            <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full border border-gray-200 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-gray-700 text-lg leading-relaxed">
                        Selamat datang di sistem perpustakaan berbasis web. Akses mudah kapan saja dan di mana saja.
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col gap-4 w-full mt-2">
                        <Link
                            to="/login"
                            className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 text-base font-medium shadow-sm"
                        >
                            <LogIn size={20} /> Masuk Sekarang
                        </Link>

                        <Link
                            to="/register"
                            className="w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2 text-base font-medium"
                        >
                            <Library size={20} /> Buat Akun Baru
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="mt-10 text-gray-500 text-sm">
                © 2025 Perpustakaan Digital — All Rights Reserved
            </footer>
        </div>
    );
}
