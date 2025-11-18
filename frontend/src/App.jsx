import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import AdminLayout from "./components/shared/AdminLayout.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
