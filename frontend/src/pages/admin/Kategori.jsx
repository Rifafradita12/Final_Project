import { useEffect, useState } from "react";
import {
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
} from "../../_services/kategori";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [namaInput, setNamaInput] = useState("");

    useEffect(() => {
        loadKategori();
    }, []);

    const loadKategori = async () => {
        try {
            const res = await getKategori();
            setKategori(res.data.data || []);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data kategori.");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditMode(false);
        setNamaInput("");
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditMode(true);
        setCurrentId(item.id_kategori);
        setNamaInput(item.nama);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!namaInput.trim()) return alert("Nama kategori wajib diisi!");

        try {
            if (editMode) {
                await updateKategori(currentId, namaInput);
            } else {
                await createKategori(namaInput);
            }
            setModalOpen(false);
            loadKategori();
        } catch (err) {
            console.error(err);
            alert("Gagal menyimpan data!");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus kategori ini?")) return;
        try {
            await deleteKategori(id);
            loadKategori();
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus data!");
        }
    };

    if (loading)
        return (
            <div className="p-8 text-center text-xl font-semibold text-gray-600">
                Memuat data kategori...
            </div>
        );

    if (error)
        return (
            <div className="p-8 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg">
                {error}
            </div>
        );

    return (
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Data Kategori Buku
                </h2>

                <button
                    onClick={openAddModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm shadow transition"
                >
                    + Tambah
                </button>
            </div>

            <div className="overflow-hidden bg-white shadow-md rounded-xl border border-gray-100">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-gray-600 uppercase text-xs font-semibold">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Nama</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {kategori.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-6 text-center text-gray-500">
                                    Belum ada kategori.
                                </td>
                            </tr>
                        ) : (
                            kategori.map((k) => (
                                <tr
                                    key={k.id_kategori}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-6">{k.id_kategori}</td>
                                    <td className="py-3 px-6 font-medium">{k.nama}</td>
                                    <td className="py-3 px-6 text-center space-x-2">
                                        <button
                                            onClick={() => openEditModal(k)}
                                            className="text-yellow-600 hover:text-yellow-700 text-xs font-semibold transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(k.id_kategori)}
                                            className="text-red-600 hover:text-red-700 text-xs font-semibold transition"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80 animate-scaleIn">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">
                            {editMode ? "Edit Kategori" : "Tambah Kategori"}
                        </h3>

                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                            placeholder="Nama kategori..."
                            value={namaInput}
                            onChange={(e) => setNamaInput(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-lg text-sm transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Batal
                            </button>

                            <button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
                                onClick={handleSubmit}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
