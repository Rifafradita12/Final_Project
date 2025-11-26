import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, Repeat, LogOut } from "lucide-react";

export default function UserLayout() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const menu = [
        { name: "Dashboard", to: "/user", icon: <LayoutDashboard size={20} /> },
        { name: "Data Kategori", to: "/user/perpustakaan", icon: <Users size={20} /> },
        { name: "Data Buku", to: "/user/buku", icon: <BookOpen size={20} /> },
        { name: "Sirkulasi", to: "/user/sirkulasi", icon: <Repeat size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* SIDEBAR */}
            <aside
                className={`
                    ${open ? "w-64" : "w-40"}
                    bg-white border-r border-gray-200
                    p-5 flex flex-col transition-all duration-300
                    fixed md:static inset-y-0 z-20 shadow-sm
                    no-underline
                `}
            >
                {/* Toggle */}
                <button
                    className="mb-6 text-gray-600 hover:bg-gray-100 p-2 my-8 rounded-lg w-fit"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                {/* Title */}
                <h1
                    className={`text-xl font-semibold my-8 transition-all ${!open && "opacity-0 hidden"}`}
                >
                    User Panel
                </h1>

                {/* NAVIGATION */}
                <nav className="flex flex-col gap-2 flex-1  my-2 select-none">
                    {menu.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`
                                px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-3
                                no-underline
                                ${location.pathname === item.to
                                    ? "bg-gray-200 text-gray-900 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                                }
                                ${!open && "justify-center px-0"}
                            `}
                        >
                            {item.icon}
                            {open && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                {/* LOGOUT */}
                <Link
                    to="/login"
                    className={`
                        mt-5 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-100 transition no-underline
                        flex items-center gap-3 no-underline
                        ${!open && "justify-center px-0"}
                    `}
                >
                    <LogOut size={20} />
                    {open && "Logout"}
                </Link>
            </aside>

            {/* OVERLAY (mobile) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/20 z-10 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* CONTENT */}
            <main
                className={`flex-1 p-6 transition-all md:ml-0 ${open ? "ml-64" : "ml-20"}`}
            >
                <div className="bg-white border border-gray-200 rounded-2xl shadow p-8 min-h-[80vh]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
