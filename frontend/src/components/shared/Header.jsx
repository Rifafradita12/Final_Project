import React from "react";
import { Search, User, LogOut } from "lucide-react";
import "./shared.css";

export default function Header({ onLogout }) {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    return (
        <header className="app-header">
            <div className="header-left">
                <h1 className="app-title">e-Library</h1>
                <div className="search-box">
                    <Search size={16} />
                    <input placeholder="Cari buku, kategori..." />
                </div>
            </div>

            <div className="header-right">
                <div className="user-info">
                    <div className="avatar">{user ? user.nama?.charAt(0).toUpperCase() : <User size={16} />}</div>
                    <div className="user-meta">
                        <div className="user-name">{user ? user.nama : "Guest"}</div>
                        <div className="user-role">{user ? user.role : "visitor"}</div>
                    </div>
                </div>

                <button className="btn-logout" onClick={() => onLogout && onLogout()} title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}
