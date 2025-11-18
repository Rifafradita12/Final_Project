import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, children }) => {
    const role = localStorage.getItem("role");

    // Jika belum login
    if (!role) {
        alert("Silakan anda login terlebih dahulu!");
        return <Navigate to="/login" replace />;
    }

    // Jika role tidak sesuai
    if (role !== requiredRole) {
        alert("Anda tidak memiliki akses untuk halaman ini!");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
