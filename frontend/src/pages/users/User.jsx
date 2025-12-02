import { useEffect, useState } from "react";
import { getKategori } from "../../_services/kategori";
import {
    BookOpen,
    Layers,
    Repeat,
    LibraryBig,
    BookmarkCheck,
    BookCopy,
} from "lucide-react";

import API from "../../_api";
import "./UserDashboard.css";

export default function UserDashboard() {
    const [stats, setStats] = useState(null);
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await API.get("/dashboard");
                setStats(res.data.data);

                const kategoriData = await getKategori();
                setKategori(kategoriData);

                setLoading(false);
            } catch (error) {
                console.error("Error loading dashboard:", error);
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const menu = [
        { name: "Data Kategori", desc: "Kelola kategori buku", to: "/user/buku", icon: Layers },
        { name: "Data Buku", desc: "Kelola semua data buku", to: "/user/buku_user", icon: LibraryBig },
        { name: "Sirkulasi", desc: "Peminjaman & pengembalian", to: "/user/sirkulasi_user", icon: Repeat },
    ];

    if (loading) return <p className="loading-text">Loading dashboard...</p>;

    return (
        <div className="dashboard-container">
            
            <div className="dashboard-header">
                <h1 className="dashboard-title">User Dashboard</h1>
                <p className="dashboard-subtitle">
                    Selamat datang! Berikut ringkasan aktivitas perpustakaan.
                </p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total Buku" value={stats.total_buku} icon={BookCopy} color="blue" />
                <StatCard title="Dipinjam" value={stats.total_dipinjam} icon={BookOpen} color="green" />
                <StatCard title="Total User" value={stats.total_user} icon={Layers} color="orange" />
                <StatCard title="Selesai Dibaca" value={stats.total_dikembalikan} icon={BookmarkCheck} color="purple" />
            </div>

            <div className="menu-grid">
                {menu.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <a key={i} href={item.to} className="menu-card">
                            <div className="menu-header">
                                <Icon size={26} />
                                <h2>{item.name}</h2>
                            </div>
                            <p>{item.desc}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="stat-card">
            <div className={`icon-box ${color}`}>
                <Icon size={26} />
            </div>
            <div>
                <p className="stat-title">{title}</p>
                <h2 className="stat-value">{value}</h2>
            </div>
        </div>
    );
}
