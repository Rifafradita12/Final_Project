import { useEffect, useState } from "react";
// Asumsi _services/kategori.js berisi fungsi yang menggunakan Axios untuk memanggil API
import { getKategori } from "../../_services/kategori";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadKategori();
    }, []);

    const loadKategori = async () => {
        try {
            const res = await getKategori();
            // Sesuaikan dengan response backend (asumsi format: { data: { data: [...] } })
            setKategori(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
            setError("Gagal memuat data kategori. Pastikan API berjalan.");
            setLoading(false);
        }
    };

    // --- Tampilan Loading dan Error ---
    if (loading) {
        return <div className="p-8 text-center text-xl font-medium">Memuat Data Kategori...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>;
    }
    // ------------------------------------


    return (
        <div className="p-8">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800"> Data Kategori Buku</h2>

            {/* Tombol Aksi */}
            <div className="flex justify-between items-center mb-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-150">
                    + Tambah Kategori
                </button>
            </div>


            {/* Container Tabel dengan Styling Shadow dan Rounded Corner */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full leading-normal">
                    {/* Header Tabel */}
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
                            <th className="py-3 px-6 text-left">ID Kategori</th>
                            <th className="py-3 px-6 text-left">Nama Kategori</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>

                    {/* Body Tabel */}
                    <tbody className="text-gray-700 text-sm font-light">
                        {kategori.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-5 px-6 text-center text-gray-500">
                                    Belum ada data kategori.
                                </td>
                            </tr>
                        ) : (
                            kategori.map((k) => (
                                <tr
                                    key={k.id_kategori}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-code">
                                        {k.id_kategori}
                                    </td>
                                    <td className="py-3 px-6 text-left font-medium">
                                        {k.nama}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center space-x-2">
                                            <button className="text-yellow-600 hover:text-yellow-800 font-medium p-1 rounded-md">Edit</button>
                                            <button
                                                // onClick={() => handleDelete(k.id_kategori)} // Implementasi DELETE di sini
                                                className="text-red-600 hover:text-red-800 font-medium p-1 rounded-md"
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