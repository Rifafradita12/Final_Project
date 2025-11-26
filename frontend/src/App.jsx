import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import AdminLayout from "./components/shared/AdminLayout.jsx";
import UserDashboard from "./pages/users/User.jsx";
import UserLayout from "./components/shared/UserLayout.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Sirkulasi from "./pages/admin/Sirkulasi.jsx";
import Users from "./pages/users/Users.jsx";
import Denda from "./pages/admin/Denda.jsx";
import Kategori from "./pages/admin/Kategori.jsx";
import Landing from "./pages/landing";
import UserBooks from "./pages/users/UserBooks.jsx";
import UserChooseBooks from "./pages/users/UserChooseBooks.jsx";
import UserHistories from "./pages/users/UserHistories.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="sirkulasi" element={<Sirkulasi />} />
          <Route path="buku" element={<Denda />} />
          <Route path="perpustakaan" element={<Kategori />} />
        </Route>
        
        {/* User */}
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="anggota">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="sirkulasi_user" element={<UserHistories />} />
          <Route path="buku_user" element={<UserBooks />} />
          <Route path="buku" element={<UserChooseBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
