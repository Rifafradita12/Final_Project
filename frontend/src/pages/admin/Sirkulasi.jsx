import { useEffect, useState } from "react";
import { getSirkulasi } from "../../_services/sirkulasi";

export default function Sirkulasi() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getSirkulasi();
            // Sesuaikan dengan response backend (asumsi format: { data: { data: [...] } })
            setData(res.data.data); 
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
            setError("Gagal memuat data sirkulasi. Silakan periksa koneksi API.");
            setLoading(false);
        }
    };

    // --- Tampilan Loading dan Error ---
    if (loading) {
        return <div className="p-8 text-center text-xl font-medium">Memuat Data Sirkulasi...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>;
    }
    // ------------------------------------

    // Helper untuk menentukan warna badge status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'PINJAM':
                return 'bg-blue-100 text-blue-800';
            case 'KEMBALI':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Data Transaksi Sirkulasi</h2>

            {/* Tombol Aksi */}
            <div className="flex justify-between items-center mb-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-150">
                    + Tambah Peminjaman
                </button>
            </div>

            {/* Container Tabel (Horizontal Scrollable) */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full leading-normal">
                    {/* Header Tabel */}
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            <th className="py-3 px-4 text-left">ID SK</th>
                            <th className="py-3 px-4 text-left">Tgl Pinjam</th>
                            <th className="py-3 px-4 text-left">Tgl Kembali</th>
                            <th className="py-3 px-4 text-left">Tempo</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Anggota</th>
                            <th className="py-3 px-4 text-center">Buku</th>
                            <th className="py-3 px-4 text-center">Denda</th>
                            <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                    </thead>

                    {/* Body Tabel */}
                    <tbody className="text-gray-700 text-sm font-light">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="py-5 px-6 text-center text-gray-500">
                                    Tidak ada data sirkulasi yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr 
                                    key={item.id_sk} 
                                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="py-3 px-4 text-left whitespace-nowrap">{item.id_sk}</td>
                                    
                                    {/* Tanggal */}
                                    <td className="py-3 px-4 text-left">{item.tgl_pinjam}</td>
                                    <td className="py-3 px-4 text-left">{item.tgl_kembali || '-'}</td>
                                    <td className="py-3 px-4 text-left font-medium text-red-500">{item.tgl_tempo_kembali}</td>
                                    
                                    {/* Status Badge */}
                                    <td className="py-3 px-4 text-center">
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold uppercase ${getStatusBadge(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    
                                    {/* ID Relasi (Asumsi ini adalah ID, idealnya tampilkan NAMA) */}
                                    <td className="py-3 px-4 text-center">{item.table_anggota_id_anggota}</td>
                                    <td className="py-3 px-4 text-center">{item.table_buku_id_buku}</td>
                                    <td className="py-3 px-4 text-center">{item.denda_iddenda || '-'}</td>
                                    
                                    {/* Kolom Aksi */}
                                    <td className="py-3 px-4 text-center whitespace-nowrap">
                                        <div className="flex item-center justify-center space-x-2">
                                            {item.status === 'PINJAM' ? (
                                                <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-2 rounded-lg">Kembalikan</button>
                                            ) : (
                                                <button className="text-gray-500 hover:text-gray-800 text-xs font-medium">Detail</button>
                                            )}
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