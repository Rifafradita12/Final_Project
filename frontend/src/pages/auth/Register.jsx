import React, { useState } from "react";
import { register } from "../../_services/auth";
import "./Register.css";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
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

        const newError = {};

        if (!form.name.trim()) newError.name = "Nama tidak boleh kosong";
        if (!form.email.trim()) newError.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newError.email = "Format email tidak valid";
        if (!form.password.trim()) newError.password = "Password wajib diisi";
        else if (form.password.length < 8)
            newError.password = "Password minimal 8 karakter";

        if (Object.keys(newError).length > 0) {
            setError(newError);
            setLoading(false);
            return;
        }

        try {
            const res = await register(form);
            console.log("REGISTER RESPONSE:", res);

            setPesan("Registrasi berhasil! Silakan login.");
            setForm({ name: "", email: "", password: "" });
        } catch (err) {
            if (err.response?.status === 422) {
                setError(err.response.data); // tampilkan error Laravel
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
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama"
                        />
                        {error.name && <p className="error">{error.name}</p>}
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
