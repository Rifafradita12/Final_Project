import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminNavbar() {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md mb-10 transition-all">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
                    Admin Panel
                </h1>
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/genre"
                        className={`px-4 py-2 rounded-lg font-medium ${location.pathname === "/admin/genre"
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                            }`}
                    >
                        Genre
                    </Link>
                    <Link
                        to="/admin/author"
                        className={`px-4 py-2 rounded-lg font-medium ${location.pathname === "/admin/author"
                                ? "bg-green-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800"
                            }`}
                    >
                        Author
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="ml-3 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:opacity-80 transition"
                    >
                        {darkMode ? "🌙" : "☀️"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
