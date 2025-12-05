import { useEffect, useState } from "react";
import { getSirkulasi, accKembali } from "../../_services/sirkulasi";
import { CheckCircle } from "lucide-react";

export default function Sirkulasi() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getSirkulasi();
            setData(Array.isArray(res) ? res : []);
        } catch (err) {
            setError("Gagal memuat data.");
        }
        setLoading(false);
    };

    const handleAccKembali = async (id) => {
        if (!window.confirm("Setujui pengembalian buku ini?")) return;

        setProcessing(id);

        try {
            await accKembali(id);
            alert("Pengembalian buku telah disetujui!");
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengsetujui pengembalian!");
            console.error(error);
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="p-8">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-blue-600 rounded"></div>
                <h1 className="text-3xl font-bold tracking-wide text-gray-800">
                    Data Sirkulasi
                </h1>
            </div>

            {/* DESKRIPSI */}
            <p className="text-gray-600 text-sm mb-6">
                Data Sirkulasi menampilkan riwayat peminjaman dan pengembalian buku oleh anggota perpustakaan.
            </p>

            {/* CONTAINER */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

                {loading && (
                    <div className="p-6 text-center text-gray-500">Loading...</div>
                )}

                {error && (
                    <div className="p-6 text-center text-red-500">{error}</div>
                )}

                {!loading && !error && (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-4 px-4 text-left font-semibold text-gray-600">No</th>
                                <th className="py-4 px-4 text-left font-semibold text-gray-600">Nama User</th>
                                <th className="py-4 px-4 text-left font-semibold text-gray-600">Tgl Pinjam</th>
                                <th className="py-4 px-4 text-left font-semibold text-gray-600">Tgl Kembali</th>
                                <th className="py-4 px-4 text-left font-semibold text-gray-600">Tempo</th>
                                <th className="py-4 px-4 text-center font-semibold text-gray-600">Status</th>
                                <th className="py-4 px-4 text-center font-semibold text-gray-600">Buku</th>
                                <th className="py-4 px-4 text-center font-semibold text-gray-600">Denda</th>
                                <th className="py-4 px-4 text-center font-semibold text-gray-600">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="py-6 text-center text-gray-500 italic"
                                    >
                                        Tidak ada data.
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr
                                        key={item.id || index}
                                        className="border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium text-gray-800">{item.namaUser}</td>
                                        <td className="py-3 px-4">{item.tglPinjam}</td>
                                        <td className="py-3 px-4">{item.tglKembali ?? "-"}</td>

                                        <td
                                            className={`py-3 px-4 font-medium ${
                                                item.tglTempo && item.tglKembali && item.tglTempo < item.tglKembali
                                                    ? "text-red-600"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {item.tglTempo}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    item.status === "PINJAM"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : item.status === "MENUNGGU ACC"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {typeof item.buku === 'object' && item.buku ? (
                                                <div className="text-left">
                                                    <p className="font-semibold text-gray-900 text-xs">{item.buku.judulBuku}</p>
                                                    {item.buku.pengarang && (
                                                        <p className="text-xs text-gray-500">{item.buku.pengarang}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="font-semibold text-gray-900 text-xs">{item.buku || "-"}</p>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-center font-semibold text-gray-700">
                                            {item.denda && typeof item.denda === 'object' ? (
                                                <div className="text-xs">
                                                    <p className="font-bold text-red-700">{item.denda.harga?.toLocaleString?.('id-ID') ? 'Rp ' + item.denda.harga.toLocaleString('id-ID') : 'Rp ' + item.denda.harga}</p>
                                                    {item.denda.jenis && (
                                                        <p className="text-red-600">{item.denda.jenis}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {item.status === "MENUNGGU ACC" ? (
                                                <button
                                                    disabled={processing === item.id}
                                                    onClick={() => handleAccKembali(item.id)}
                                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded text-xs font-semibold transition flex items-center gap-1 justify-center"
                                                >
                                                    <CheckCircle size={14} />
                                                    {processing === item.id ? "Proses..." : "ACC"}
                                                </button>
                                            ) : (
                                                <span className="text-gray-500 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
