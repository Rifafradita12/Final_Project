import { useEffect, useState } from "react";
import { getUsers } from "../../_services/users";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data.data); // sesuaikan dengan response backend
            setLoading(false);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Gagal memuat data pengguna. Silakan periksa koneksi.");
            setLoading(false);
        }
    };

    // --- Tampilan Loading dan Error ---
    if (loading) {
        return <div className="p-8 text-center text-xl font-medium">Memuat Data Pengguna...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>;
    }
    // ------------------------------------
    
    // Helper untuk menentukan warna badge Role
    const getRoleBadge = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'anggota':
                return 'bg-indigo-100 text-indigo-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">👤 Data Pengguna (Users)</h2>
            
            {/* Tombol Aksi */}
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-150">
                    + Tambah Pengguna
                </button>
            </div>


            {/* Container Tabel (Horizontal Scrollable) */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full leading-normal">
                    {/* Header Tabel */}
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Nama</th>
                            <th className="py-3 px-4 text-center">Jekel</th>
                            <th className="py-3 px-4 text-left">Prodi</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-center">No HP</th>
                            <th className="py-3 px-4 text-center">Role</th>
                            <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                    </thead>

                    {/* Body Tabel */}
                    <tbody className="text-gray-700 text-sm font-light">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-5 px-6 text-center text-gray-500">
                                    Tidak ada data pengguna yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr 
                                    key={u.id_user} 
                                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="py-3 px-4 text-left whitespace-nowrap">{u.id_user}</td>
                                    <td className="py-3 px-4 text-left font-medium">{u.nama}</td>
                                    <td className="py-3 px-4 text-center">{u.jekel}</td>
                                    <td className="py-3 px-4 text-left">{u.prodi}</td>
                                    <td className="py-3 px-4 text-left font-mono text-xs">{u.Email}</td> {/* Menggunakan font-mono untuk email */}
                                    <td className="py-3 px-4 text-center">{u.No_HP}</td>
                                    
                                    {/* Role Badge */}
                                    <td className="py-3 px-4 text-center">
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold uppercase ${getRoleBadge(u.role)}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    
                                    {/* Kolom Aksi */}
                                    <td className="py-3 px-4 text-center whitespace-nowrap">
                                        <div className="flex item-center justify-center space-x-2">
                                            <button className="text-yellow-600 hover:text-yellow-800 font-medium text-xs p-1 rounded-md">Edit</button>
                                            <button 
                                                // onClick={() => handleDelete(u.id_user)} // Implementasi DELETE di sini
                                                className="text-red-600 hover:text-red-800 font-medium text-xs p-1 rounded-md"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}