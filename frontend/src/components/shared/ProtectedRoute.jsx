import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Jika belum login
    if (!user) {
        alert("Silakan anda login terlebih dahulu!");
        return <Navigate to="/login" replace />;
    }

    // Jika role tidak sesuai
    if (user.role !== requiredRole) {
        alert("Anda tidak memiliki akses untuk halaman ini!");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
