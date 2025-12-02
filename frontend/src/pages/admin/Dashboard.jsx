import { useEffect, useState } from "react";
import { getDashboard } from "../../_services/dashboard";
import "./Dashbord.css";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_user: 0,
        total_buku: 0,
        total_dipinjam: 0,
        total_dikembalikan: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getDashboard();
            setStats(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="dashboard-container">

            <h1 className="dashboard-title">Dashboard Admin</h1>
            <p className="dashboard-subtitle">
                Selamat datang! Berikut ringkasan aktivitas perpustakaan.
            </p>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Total User"
                    value={stats.total_user}
                    color="card-blue"
                />

                <DashboardCard
                    title="Total Buku"
                    value={stats.total_buku}
                    color="card-purple"
                />

                <DashboardCard
                    title="Sedang Dipinjam"
                    value={stats.total_dipinjam}
                    color="card-orange"
                />

                <DashboardCard
                    title="Sudah Dikembalikan"
                    value={stats.total_dikembalikan}
                    color="card-green"
                />

            </div>
        </div>
    );
}

function DashboardCard({ title, value, color }) {
    return (
        <div className={`dashboard-card ${color}`}>
            <p className="card-title">{title}</p>
            <h2 className="card-value">{value}</h2>
        </div>
    );
}
