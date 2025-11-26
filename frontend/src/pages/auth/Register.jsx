import React, { useState } from "react";
import { register } from "../../_services/auth";
import "./Register.css";

function Register() {
    const [form, setForm] = useState({
        nama: "",
        jekel: "",
        prodi: "",
        email: "",
        noHP: "",
        password: "",
    });

    const [pesan, setPesan] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPesan("");
        setError({});
        setLoading(true);

        try {
            const res = await register(form);
            setPesan("Registrasi berhasil! Silakan login.");
            setForm({
                nama: "",
                jekel: "",
                prodi: "",
                email: "",
                noHP: "",
                password: "",
            });
        } catch (err) {
            if (err.response?.status === 422) {
                setError(err.response.data);
            } else {
                alert("Terjadi kesalahan server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2>Daftar Akun Baru</h2>

                <form onSubmit={handleSubmit}>
                    
                    {/* Nama */}
                    <div className="input-group">
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            placeholder="Masukkan nama"
                        />
                        {error.nama && <p className="error">{error.nama}</p>}
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="input-group">
                        <label>Jenis Kelamin</label>
                        <select name="jekel" value={form.jekel} onChange={handleChange}>
                            <option value="">-- Pilih --</option>
                            <option value="lakiLaki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                        </select>
                        {error.jekel && <p className="error">{error.jekel}</p>}
                    </div>

                    {/* Prodi */}
                    <div className="input-group">
                        <label>Program Studi</label>
                        <input
                            type="text"
                            name="prodi"
                            value={form.prodi}
                            onChange={handleChange}
                            placeholder="contoh: Teknik Informatika"
                        />
                        {error.prodi && <p className="error">{error.prodi}</p>}
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

                    {/* Nomor HP */}
                    <div className="input-group">
                        <label>No Hp</label>
                        <input
                            type="text"
                            name="noHP"
                            value={form.noHP}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                        />
                        {error.noHP && <p className="error">{error.noHP}</p>}
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Minimal 8 karakter"
                        />
                        {error.password && <p className="error">{error.password}</p>}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Memproses..." : "Daftar"}
                    </button>
                </form>

                {pesan && <p className="success">{pesan}</p>}

                <p className="register-link">
                    Sudah punya akun? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
