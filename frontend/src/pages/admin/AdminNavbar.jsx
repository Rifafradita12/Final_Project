import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-left">
                <h2 className="logo">📚 Admin Dashboard | Perpustakaan</h2>
            </div>
            <ul className="admin-navbar-links">
                <li>
                    <Link to="/admin/genre">Data Perpustakaan</Link>
                </li>
                <li>
                    <Link to="/admin/author">Data Buku</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
