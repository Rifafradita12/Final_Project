import React, { useState } from "react";
import "./Register.css";

function Register() {
    // Data yang diinput oleh pengguna
    const [form, setForm] = useState({
        nama: "",
        email: "",
        username: "",
        password: "",
    });

    // Pesan sukses setelah registrasi berhasil
    const [pesan, setPesan] = useState("");

    // Menyimpan pesan error per input
    const [error, setError] = useState({});

    // Menangani perubahan setiap input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Menangani tombol submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = {};

        // Validasi sederhana untuk tiap field
        if (!form.nama.trim()) newError.nama = "Nama tidak boleh kosong";
        if (!form.email.trim()) newError.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newError.email = "Format email tidak valid";
        if (!form.username.trim()) newError.username = "Username wajib diisi";
        if (!form.password.trim()) newError.password = "Password wajib diisi";
        else if (form.password.length < 6)
            newError.password = "Password minimal 6 karakter";

        setError(newError);

        // Jika tidak ada error, tampilkan pesan sukses
        if (Object.keys(newError).length === 0) {
            console.log("Data tersimpan:", form);
            setPesan("Registrasi berhasil! Silakan login.");
            setForm({ nama: "", email: "", username: "", password: "" });
        } else {
            setPesan("");
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2>Daftar Akun Baru</h2>

                {/* Formulir Registrasi */}
                <form onSubmit={handleSubmit}>
                    {/* Nama Lengkap */}
                    <div className="input-group">
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                        />
                        {error.nama && <p className="error">{error.nama}</p>}
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Masukkan email aktif"
                        />
                        {error.email && <p className="error">{error.email}</p>}
                    </div>

                    {/* Username */}
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Buat username"
                        />
                        {error.username && <p className="error">{error.username}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Minimal 6 karakter"
                        />
                        {error.password && <p className="error">{error.password}</p>}
                    </div>

                    <button type="submit">Daftar</button>
                </form>

                {/* Pesan sukses */}
                {pesan && <p className="success">{pesan}</p>}

                {/* Link ke halaman Register */}
                <p className="register-link">
                    Sudah punya akun? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
