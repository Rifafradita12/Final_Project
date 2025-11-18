import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import "./AdminLayout.css";

function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="admin-layout">
            <AdminNavbar />
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
