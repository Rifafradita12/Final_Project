import { useEffect, useState } from "react";
import API from "../../_api";
import { kembalikanBuku } from "../../_services/sirkulasi";
import { BookOpen, CheckCircle, AlertCircle } from "lucide-react";

export default function UserHistories() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [accDetails, setAccDetails] = useState(null);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 8;

    const loadData = async () => {
        try {
            const res = await API.get("/sirkulasi");
            const all = res.data.data ?? [];

            // Get current user from localStorage and filter sirkulasi
            const userData = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = userData.id ?? userData.user_id ?? null;
            const userName = userData.nama || userData.name || null;

            const filtered = all.filter((item) => {
                // support several possible shapes: item.user_id, item.user.id, item.namaUser
                if (userId != null) {
                    if (item.user_id != null && String(item.user_id) === String(userId)) return true;
                    if (item.user && item.user.id != null && String(item.user.id) === String(userId)) return true;
                }

                if (userName) {
                    if (item.namaUser && String(item.namaUser) === String(userName)) return true;
                    if (item.user && (item.user.nama || item.user.name) && String(item.user.nama || item.user.name) === String(userName)) return true;
                }

                return false;
            });

            setData(filtered);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const formatRupiah = (value) => {
        if (!value || value === "-") return "-";
        return "Rp " + value.toLocaleString("id-ID");
    };

    const formatDate = (d) => {
        if (!d) return "-";
        try {
            return new Date(d).toLocaleDateString("id-ID", { year: 'numeric', month: 'short', day: 'numeric' });
        } catch (e) {
            return d;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "PINJAM":
                return "bg-blue-100 text-blue-700 border border-blue-300";
            case "MENUNGGU ACC":
                return "bg-yellow-100 text-yellow-700 border border-yellow-300";
            case "KEMBALI":
                return "bg-green-100 text-green-700 border border-green-300";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-300";
        }
    };

    const handleKembalikan = async (id) => {
        if (!window.confirm("Yakin ingin mengembalikan buku ini?")) return;
        setProcessing(id);

        try {
            await kembalikanBuku(id);
            alert("Permintaan pengembalian telah dikirim. Menunggu persetujuan admin!");
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengembalikan buku!");
        } finally {
            setProcessing(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    // filter and paginate data locally
    const filtered = data
        .filter((item) => {
            if (statusFilter && item.status !== statusFilter) return false;
            if (!query) return true;
            const q = query.toLowerCase();
            const title = typeof item.buku === 'object' ? (item.buku.judulBuku || "") : (item.buku || "");
            const pengarang = typeof item.buku === 'object' ? (item.buku.pengarang || "") : "";
            return title.toLowerCase().includes(q) || pengarang.toLowerCase().includes(q) || (item.namaUser || "").toLowerCase().includes(q);
        });

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* HEADER */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Riwayat Sirkulasi Buku</h2>
                <p className="text-gray-600 mt-2">Catatan peminjaman dan pengembalian buku kamu.</p>
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-600">
                            <tr className="text-left font-semibold text-white">
                                <th className="py-3 px-4">No</th>
                                <th className="py-3 px-4">Tgl Pinjam</th>
                                <th className="py-3 px-4">Tgl Kembali</th>
                                <th className="py-3 px-4">Batas Tempo</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Buku</th>
                                <th className="py-3 px-4">Denda</th>
                                <th className="py-3 px-4 text-center">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <BookOpen size={40} className="text-gray-300 mb-2" />
                                                <p className="font-semibold mb-2">Tidak ada riwayat peminjaman</p>
                                                <p className="text-sm text-gray-400">Belum ada transaksi. Coba pinjam buku sekarang.</p>
                                                <a href="/user/buku" className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded">Lihat Buku</a>
                                        </div>
                                    </td>
                                </tr>
                                ) : (
                                    // render paginated rows
                                    paginated.map((item, idx) => (
                                        <tr key={item.id || idx} className="border-b border-gray-200 hover:bg-blue-50 transition">
                                            <td className="py-3 px-4 text-gray-800">{(page - 1) * perPage + idx + 1}</td>
                                            <td className="py-3 px-4 text-gray-700">{formatDate(item.tglPinjam)}</td>
                                            <td className="py-3 px-4 text-gray-700">{formatDate(item.tglKembali)}</td>
                                            <td className="py-3 px-4 font-semibold text-red-600">{formatDate(item.tglTempo)}</td>

                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusClass(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="py-3 px-4">
                                                {typeof item.buku === 'object' ? (
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{item.buku.judulBuku}</p>
                                                        {item.buku.pengarang && (
                                                            <p className="text-xs text-gray-500">{item.buku.pengarang}</p>
                                                        )}
                                                    </div>
                                                ) : <p className="font-semibold text-gray-900 text-sm">{item.buku}</p>}
                                            </td>

                                            <td className="py-3 px-4">
                                                {item.denda ? (
                                                    <div className="bg-red-50 p-2 rounded border border-red-200 text-xs">
                                                        <p className="font-bold text-red-700">{formatRupiah(item.denda.harga)}</p>
                                                        {item.denda.jenis && (
                                                            <p className="text-red-600">{item.denda.jenis}</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold border border-green-200">
                                                        -
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                {item.status === "PINJAM" ? (
                                                    <button
                                                        disabled={processing === item.id}
                                                        onClick={() => handleKembalikan(item.id)}
                                                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded text-xs font-semibold transition"
                                                    >
                                                        {processing === item.id ? "Proses..." : "Kembalikan"}
                                                    </button>
                                                ) : item.status === "MENUNGGU ACC" ? (
                                                    <div className="flex items-center gap-1 text-yellow-600 text-xs font-semibold">
                                                        <AlertCircle size={14} />
                                                        Menunggu
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-green-600 text-xs font-semibold cursor-pointer" onClick={() => setAccDetails(item)}>
                                                        <CheckCircle size={14} />
                                                        Lihat Detail
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
            </div>

                {/* Table controls: search, filter, pagination */}
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Cari judul atau pengarang..." className="px-3 py-2 border rounded-md" />

                        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 border rounded-md">
                            <option value="">Semua Status</option>
                            <option value="PINJAM">PINJAM</option>
                            <option value="MENUNGGU ACC">MENUNGGU ACC</option>
                            <option value="KEMBALI">KEMBALI</option>
                        </select>
                    </div>

                    <div className="pagination">
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
                        <span className="px-3">{page} / {totalPages}</span>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
                    </div>
                </div>

            {/* SUMMARY SECTION */}
            {data.length > 0 && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Peminjaman */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
                        <p className="text-blue-100 text-sm font-medium mb-3">Total Peminjaman</p>
                        <h3 className="text-5xl font-bold">{data.length}</h3>
                    </div>

                    {/* Sudah Dikembalikan */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white shadow-lg">
                        <p className="text-green-100 text-sm font-medium mb-3">Sudah Dikembalikan</p>
                        <h3 className="text-5xl font-bold">{data.filter(d => d.status === "KEMBALI").length}</h3>
                    </div>

                    {/* Masih Dipinjam */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 text-white shadow-lg">
                        <p className="text-orange-100 text-sm font-medium mb-3">Masih Dipinjam</p>
                        <h3 className="text-5xl font-bold">{data.filter(d => d.status === "PINJAM" || d.status === "MENUNGGU ACC").length}</h3>
                    </div>
                </div>
            )}

            {/* ACC DETAILS MODAL */}
            {accDetails && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl p-8 max-w-sm shadow-2xl">
                        <div className="text-center mb-6">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900">Buku Telah Dikembalikan</h3>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div>
                                <p className="text-xs text-gray-600">Judul Buku</p>
                                <p className="font-semibold text-gray-900">{typeof accDetails.buku === 'object' ? accDetails.buku.judulBuku : accDetails.buku}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Tanggal Dikembalikan</p>
                                <p className="font-semibold text-gray-900">{accDetails.tglKembali}</p>
                            </div>
                            {accDetails.denda && (
                                <div>
                                    <p className="text-xs text-gray-600">Denda</p>
                                    <p className="font-semibold text-red-600">{formatRupiah(accDetails.denda.harga)}</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setAccDetails(null)}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
