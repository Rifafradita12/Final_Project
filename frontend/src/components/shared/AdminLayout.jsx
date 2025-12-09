import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Repeat, LogOut } from "lucide-react";
import "./AdminLayout.css";
import Header from "./Header";
import "./shared.css";

export default function AdminLayout() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const menu = [
        { name: "Dashboard", to: "/admin", icon: <LayoutDashboard size={21} /> },
        { name: "Data Kategori", to: "/admin/perpustakaan", icon: <Users size={21} /> },
        { name: "Data Buku", to: "/admin/buku", icon: <BookOpen size={21} /> },
        { name: "Sirkulasi", to: "/admin/sirkulasi", icon: <Repeat size={21} /> },
    ];

    return (
        <div className="admin-layout-wrapper">
            
            {/* Sidebar */}
            <aside className={`sidebar ${open ? "open" : "closed"}`}>
                <button className="toggle-btn" onClick={() => setOpen(!open)}>
                    ☰
                </button>

                <h1 className={`sidebar-title ${!open ? "hide" : ""}`}>
                    Admin Perpustakaan
                </h1>

                <nav className="menu">
                    {menu.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`menu-item ${
                                location.pathname === item.to ? "active" : ""
                            } ${!open ? "center" : ""}`}
                        >
                            <div className="icon">{item.icon}</div>
                            {open && <span className="text">{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <Link
                    to="/login"
                    className={`logout menu-item ${!open ? "center" : ""}`}
                >
                    <LogOut size={20} />
                    {open && <span>Logout</span>}
                </Link>
            </aside>

            {/* Mobile Overlay */}
            {open && (
                <div className="mobile-overlay" onClick={() => setOpen(false)} />
            )}

            {/* Content */}
            <main className={`content ${open ? "shifted" : "compact"}`}>
                <Header onLogout={() => (window.location.href = "/login")} />
                <div className="content-card">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
