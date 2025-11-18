import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
    // Menyimpan data input user
    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Saat input berubah
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Saat tombol login diklik
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi sederhana
        if (!user.username || !user.password) {
            setError("Semua kolom wajib diisi!");
            return;
        }

        // Simulasi login (ganti nanti dengan backend API)
        if (user.username === "admin" && user.password === "123456") {
            localStorage.setItem("role", "admin");
            navigate("/admin"); // ke halaman admin
        } else if (user.username === "user" && user.password === "12345") {
            localStorage.setItem("role", "user");
            navigate("/"); // ke halaman utama
        } else {
            setError("Username atau password salah!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Masuk ke Akun Anda</h2>

                <form onSubmit={handleSubmit}>
                    {/* Input Username */}
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Masukkan username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input Password */}
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Masukkan password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>


                    <button type="submit" className="btn-login">
                        Login
                    </button>
                </form>


                {error && <p className="error">{error}</p>}


                <p className="register-link">
                    Belum punya akun? <a href="/register">Daftar Sekarang</a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
