import {
    BookOpen,
    Layers,
    Repeat,
    LibraryBig,
    BookmarkCheck,
    BookCopy,
} from "lucide-react";

export default function UserDashboard() {
    const stats = [
        {
            title: "Total Buku",
            value: 128,
            icon: BookCopy,
            color: "text-blue-600",
        },
        {
            title: "Buku Dipinjam",
            value: 12,
            icon: BookOpen,
            color: "text-green-600",
        },
        {
            title: "Kategori",
            value: 8,
            icon: Layers,
            color: "text-orange-600",
        },
        {
            title: "Selesai Dibaca",
            value: 5,
            icon: BookmarkCheck,
            color: "text-purple-600",
        },
    ];

    const menu = [
        {
            name: "Data Kategori",
            desc: "Kelola kategori buku",
            to: "/user/perpustakaan",
            icon: Layers,
        },
        {
            name: "Data Buku",
            desc: "Kelola semua data buku",
            to: "/user/buku",
            icon: LibraryBig,
        },
        {
            name: "Sirkulasi",
            desc: "Peminjaman & pengembalian",
            to: "/user/sirkulasi",
            icon: Repeat,
        },
    ];

    return (
        <div className="space-y-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>

            {/* STATISTIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition"
                        >
                            <div
                                className={`p-3 rounded-lg bg-gray-50 border ${item.color}`}
                            >
                                <Icon size={26} className={item.color} />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">{item.title}</p>
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {item.value}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MENU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <h2 className="text-lg font-semibold text-gray-800">
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
