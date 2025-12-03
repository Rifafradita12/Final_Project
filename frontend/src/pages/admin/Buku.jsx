import { useEffect, useState } from "react";
import { getKategori } from "../../_services/kategori";
import { getBuku, createBuku, updateBuku, deleteBuku } from "../../_services/buku";

export default function AdminBuku() {
    const bookImageStorage = "http://localhost:8000/storage";

    const [kategori, setKategori] = useState([]);
    const [buku, setBuku] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [form, setForm] = useState({
        id: "",
        judulBuku: "",
        pengarang: "",
        penerbit: "",
        thTerbit: "",
        stok: "",
        kategori_id: "",
        foto: null,
    });

    useEffect(() => {
        loadKategori();
        loadBuku();
    }, []);

    const loadKategori = async () => {
        try {
            const res = await getKategori();
            // getKategori sudah return array langsung, bukan nested
            setKategori(Array.isArray(res) ? res : []);
            
        } catch (e) {
            console.log(e);
        }
    };

    const loadBuku = async () => {
        try {
            const res = await getBuku();
            // getBuku return data array langsung
            setBuku(Array.isArray(res) ? res : []);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const openCreate = () => {
        setForm({
            id: "",
            judulBuku: "",
            pengarang: "",
            penerbit: "",
            thTerbit: "",
            stok: "",
            kategori_id: "",
            foto: null,
        });
        setPreviewImage(null);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setForm({
            id: item.id,
            judulBuku: item.judulBuku,
            pengarang: item.pengarang,
            penerbit: item.penerbit,
            thTerbit: item.thTerbit,
            stok: item.stok,
            kategori_id: item.kategori_id,
            foto: null,
        });

        setPreviewImage(
            item.foto ? `${bookImageStorage}/buku/${item.foto}` : null
        );

        setModalOpen(true);
    };

    const openDelete = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (key !== "foto" && form[key] !== null) formData.append(key, form[key]);
        });

        // hanya kirim foto kalau ada file baru
        if (form.foto instanceof File) {
            formData.append("foto", form.foto);
        }

        try {
            if (form.id) {
                await updateBuku(form.id, formData);
            } else {
                await createBuku(formData);
            }
            setModalOpen(false);
            loadBuku();
        } catch (err) {
            console.error(err);
            alert("Gagal menyimpan data.");
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteBuku(deleteId);
            setDeleteModal(false);
            loadBuku();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Manajemen Buku</h2>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                    + Tambah Buku
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                            <tr className="text-left text-sm font-semibold text-white">
                                <th className="py-4 px-6">No</th>
                                <th className="py-4 px-6">Judul</th>
                                <th className="py-4 px-6">Kategori</th>
                                <th className="py-4 px-6">Pengarang</th>
                                <th className="py-4 px-6">Stok</th>
                                <th className="py-4 px-6">Tahun</th>
                                <th className="py-4 px-6">Foto</th>
                                <th className="py-4 px-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buku.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-8 text-center text-gray-500">
                                        Tidak ada data buku
                                    </td>
                                </tr>
                            ) : (
                                buku.map((b, index) => (
                                    <tr key={b.id} className="border-b hover:bg-blue-50 transition">
                                        <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                                        <td className="py-4 px-6 text-gray-700 font-medium">{b.judulBuku}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {b.kategori?.nama}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">{b.pengarang}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                                b.stok > 5 ? 'bg-green-100 text-green-700' : b.stok > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {b.stok}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-700">{b.thTerbit}</td>
                                        <td className="py-4 px-6">
                                            {b.foto ? (
                                                <img
                                                    src={`${bookImageStorage}/buku/${b.foto}`}
                                                    alt={b.judulBuku}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => openEdit(b)}
                                                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDelete(b.id)}
                                                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
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

            {/* MODAL CREATE / EDIT */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl my-8">
                        <div className="p-8 max-h-[80vh] overflow-y-auto">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 sticky top-0 bg-white pb-4">
                                {form.id ? "✏️ Edit Buku" : "📚 Tambah Buku Baru"}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan judul buku"
                                    value={form.judulBuku}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setForm({ ...form, judulBuku: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Pengarang</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama pengarang"
                                    value={form.pengarang}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setForm({ ...form, pengarang: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Penerbit</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama penerbit"
                                    value={form.penerbit}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setForm({ ...form, penerbit: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        placeholder="2024"
                                        value={form.thTerbit}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) =>
                                            setForm({ ...form, thTerbit: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stok</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={form.stok}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) =>
                                            setForm({ ...form, stok: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                <select
                                    value={form.kategori_id}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) =>
                                        setForm({ ...form, kategori_id: e.target.value })
                                    }
                                    required
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {Array.isArray(kategori) &&
                                        kategori.map((k) => (
                                            <option key={k.id} value={k.id}>
                                                {k.nama}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Foto Buku</label>
                                <input
                                    type="file"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setForm({ ...form, foto: file });
                                            setPreviewImage(URL.createObjectURL(file));
                                        }
                                    }}
                                    accept="image/*"
                                />
                            </div>

                            {previewImage && (
                                <div className="flex justify-center">
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        className="w-32 h-40 object-cover rounded-lg border-2 border-blue-300"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DELETE */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-8 w-full max-w-sm rounded-xl shadow-2xl">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🗑️</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Buku?</h3>
                            <p className="text-gray-500 mb-6">Data buku yang dihapus tidak dapat dikembalikan</p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}