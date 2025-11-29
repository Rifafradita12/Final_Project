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
            setKategori(Array.isArray(res.data.data) ? res.data.data : []);
            
        } catch (e) {
            console.log(e);
        }
    };

    const loadBuku = async () => {
        try {
            const res = await getBuku();
            setBuku(res.data);
            setLoading(false);
        } catch (e) {
            console.log(e);
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
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Manajemen Buku</h2>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah Buku
                </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="py-3 px-6">Judul</th>
                            <th className="py-3 px-6">Kategori</th>
                            <th className="py-3 px-6">Pengarang</th>
                            <th className="py-3 px-6">Stok</th>
                            <th className="py-3 px-6">Tahun</th>
                            <th className="py-3 px-6">Foto</th>
                            <th className="py-3 px-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buku.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{b.judulBuku}</td>
                                <td className="py-3 px-6">{b.kategori?.nama}</td>
                                <td className="py-3 px-6">{b.pengarang}</td>
                                <td className="py-3 px-6">{b.stok}</td>
                                <td className="py-3 px-6">{b.thTerbit}</td>
                                <td className="py-3 px-6">
                                    {b.foto ? (
                                        <img
                                            src={`${bookImageStorage}/buku/${b.foto}`}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-400">
                                            Tidak ada
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-6 space-x-2">
                                    <button
                                        onClick={() => openEdit(b)}
                                        className="px-3 py-1 rounded bg-yellow-400 text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openDelete(b.id)}
                                        className="px-3 py-1 rounded bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL CREATE / EDIT */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
                        <h3 className="text-xl font-bold mb-4">
                            {form.id ? "Edit Buku" : "Tambah Buku Baru"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Judul Buku"
                                value={form.judulBuku}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, judulBuku: e.target.value })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Pengarang"
                                value={form.pengarang}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, pengarang: e.target.value })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Penerbit"
                                value={form.penerbit}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, penerbit: e.target.value })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Tahun Terbit"
                                value={form.thTerbit}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, thTerbit: e.target.value })
                                }
                            />

                            <input
                                type="number"
                                placeholder="Stok"
                                value={form.stok}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, stok: e.target.value })
                                }
                            />

                            <select
                                value={form.kategori_id}
                                className="w-full border rounded p-2"
                                onChange={(e) =>
                                    setForm({ ...form, kategori_id: e.target.value })
                                }
                            >
                                <option value="">Pilih Kategori</option>
                                {Array.isArray(kategori) &&
                                    kategori.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama}
                                        </option>
                                    ))}
                            </select>

                            <input
                                type="file"
                                className="w-full border rounded p-2"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setForm({ ...form, foto: file });
                                        setPreviewImage(URL.createObjectURL(file));
                                    }
                                }}
                            />

                            {previewImage && (
                                <img
                                    src={previewImage}
                                    className="w-32 h-32 object-cover rounded-md border"
                                />
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DELETE */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 w-80 rounded-xl shadow-lg">
                        <p className="text-lg mb-4 text-center">
                            Hapus buku ini?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
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
