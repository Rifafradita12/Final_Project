import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { login } from "../../_services/auth";

function LoginForm() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            setError("Semua kolom wajib diisi!");
            return;
        }

        try {
            const res = await login(user); 
            const data = res.data;

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            console.log(localStorage.getItem('user'))

            if (data.user.role === "admin") {
                navigate("/admin");
            } else if (data.user.role === "anggota") {
                navigate("/user");
            } else {
                setError("Role tidak dikenali!");
            }
        } catch (err) {
            setError("Email atau password salah!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Masuk ke Akun Anda</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Masukkan email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

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
