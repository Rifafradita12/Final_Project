import { useEffect, useState } from "react";
import { getDashboard } from "../../_services/dashboard";

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
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
            <p className="text-gray-600">
                Selamat datang! Berikut ringkasan aktivitas perpustakaan.
            </p>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <DashboardCard
                    title="Total User"
                    value={stats.total_user}
                />

                <DashboardCard
                    title="Total Buku"
                    value={stats.total_buku}
                />

                <DashboardCard
                    title="Sedang Dipinjam"
                    value={stats.total_dipinjam}
                />

                <DashboardCard
                    title="Sudah Dikembalikan"
                    value={stats.total_dikembalikan}
                />
            </div>
        </div>
    );
}

function DashboardCard({ title, value }) {
    return (
        <div className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col gap-2 hover:shadow-md transition">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-4xl font-extrabold text-gray-900">
                {value}
            </h2>
        </div>
    );
}
