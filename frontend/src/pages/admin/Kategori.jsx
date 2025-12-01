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
            // getKategori return array langsung, bukan nested
            setKategori(Array.isArray(res) ? res : []);
        } catch (err) {
            setError("Gagal memuat kategori");
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
        setCurrentId(item.id);
        setNamaInput(item.nama);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!namaInput.trim()) return alert("Nama wajib diisi");

        try {
            if (editMode) {
                await updateKategori(currentId, namaInput);
            } else {
                await createKategori(namaInput);
            }

            setModalOpen(false);
            loadKategori();

        } catch (e) {
            alert("Gagal menyimpan kategori");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus kategori ini?")) return;

        try {
            await deleteKategori(id);
            loadKategori();
        } catch (e) {
            alert("Gagal menghapus kategori");
        }
    };

    return (
        <div className="p-8">

            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Kategori Buku</h2>

                <button
                    onClick={openAddModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah
                </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-xs uppercase text-gray-500 border-b">
                            <th className="px-6 py-3">NO</th>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {kategori.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-gray-500">
                                    Tidak ada kategori.
                                </td>
                            </tr>
                        ) : (
                            kategori.map((k, index) => (
                                <tr key={k.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3 font-medium">{k.nama}</td>
                                    <td className="px-6 py-3 text-center space-x-4">
                                        <button
                                            onClick={() => openEditModal(k)}
                                            className="text-yellow-600 hover:text-yellow-700"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(k.id)}
                                            className="text-red-600 hover:text-red-700"
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                        <h3 className="text-lg font-bold mb-4">
                            {editMode ? "Edit Kategori" : "Tambah Kategori"}
                        </h3>

                        <input
                            value={namaInput}
                            onChange={(e) => setNamaInput(e.target.value)}
                            className="border w-full p-2 rounded mb-4"
                            placeholder="Nama kategori"
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
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
