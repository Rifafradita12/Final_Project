import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Repeat,
    LogOut
} from "lucide-react";
import "./UserLayout.css";

export default function UserLayout() {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const menu = [
        { name: "Dashboard", to: "/user", icon: <LayoutDashboard size={21} /> },
        { name: "Data Buku User", to: "/user/buku_user", icon: <Users size={21} /> },
        { name: "List Buku", to: "/user/buku", icon: <BookOpen size={21} /> },
        { name: "Sirkulasi", to: "/user/sirkulasi_user", icon: <Repeat size={21} /> },
    ];

    return (
        <div className="admin-layout-wrapper">
            
            {/* SIDEBAR */}
            <aside className={`sidebar ${open ? "open" : "closed"}`}>
                <button className="toggle-btn" onClick={() => setOpen(!open)}>
                    ☰
                </button>

                <h1 className={`sidebar-title ${!open ? "hide" : ""}`}>
                    {user ? `Hi, ${user.nama}` : "User Menu"}
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

                {/* LOGOUT */}
                <Link
                    to="/login"
                    className={`logout menu-item ${!open ? "center" : ""}`}
                >
                    <LogOut size={20} />
                    {open && <span>Logout</span>}
                </Link>
            </aside>

            {/* MOBILE OVERLAY */}
            {open && (
                <div className="mobile-overlay" onClick={() => setOpen(false)} />
            )}

            {/* CONTENT */}
            <main className={`content ${open ? "shifted" : "compact"}`}>
                <div className="content-card">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
