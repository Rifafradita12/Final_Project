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

import API from "../../_api"; // pastikan path benar

export default function UserDashboard() {
    const [stats, setStats] = useState(null);
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    // Ambil data dari backend
    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await API.get("/dashboard");
                setStats(res.data.data);
                
                // Ambil data kategori
                const kategorisData = await getKategori();
                setKategori(kategorisData);
                
                setLoading(false);
            } catch (err) {
                console.error("ERROR DASHBOARD:", err);
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    const menu = [
        {
            name: "Data Kategori",
            desc: "Kelola kategori buku",
            to: "/user/buku",
            icon: Layers,
        },
        {
            name: "Data Buku",
            desc: "Kelola semua data buku",
            to: "/user/buku_user",
            icon: LibraryBig,
        },
        {
            name: "Sirkulasi",
            desc: "Peminjaman & pengembalian",
            to: "/user/sirkulasi_user",
            icon: Repeat,
        },
    ];

    if (loading)
        return <p className="text-gray-500 text-sm">Loading dashboard...</p>;

    return (
        <div className="space-y-10 no-underline">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>

            {/* STATISTIK RESPONSIVE */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Total Buku */}
                <StatCard
                    title="Total Buku"
                    value={stats.total_buku}
                    icon={BookCopy}
                    color="text-blue-600"
                />

                {/* Buku Dipinjam */}
                <StatCard
                    title="Dipinjam"
                    value={stats.total_dipinjam}
                    icon={BookOpen}
                    color="text-green-600"
                />

                {/* Total User */}
                <StatCard
                    title="Total User"
                    value={stats.total_user}
                    icon={Layers}
                    color="text-orange-600"
                />

                {/* Dikembalikan */}
                <StatCard
                    title="Selesai Dibaca"
                    value={stats.total_dikembalikan}
                    icon={BookmarkCheck}
                    color="text-purple-600"
                />
            </div>

            {/* MENU RESPONSIVE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {menu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={index}
                            href={item.to}
                            className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition"
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={24} className="text-gray-700" />
                                <h2 className="text-lg no-underline font-semibold text-gray-800">
                                    {item.name}
                                </h2>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

/* COMPONENT KECIL UNTUK CARD STAT */
function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className={`p-3 rounded-lg bg-gray-50 border ${color}`}>
                <Icon size={26} className={color} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-semibold text-gray-800">{value}</h2>
            </div>
        </div>
    );
}
