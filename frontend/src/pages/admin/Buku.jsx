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

        {/* TABLE SUPER PREMIUM */}
<div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/20 overflow-hidden">

    <div className="overflow-x-auto">
        <table className="w-full border-collapse">

            {/* HEADER */}
            <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700">
                    {["No", "Judul", "Kategori", "Pengarang", "Stok", "Tahun", "Foto", "Aksi"].map((head, i) => (
                        <th
                            key={i}
                            className="py-4 px-2 text-left text-sm font-semibold text-white tracking-wide"
                        >
                            {head}
                        </th>
                    ))}
                </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-200">
                {buku.map((item, index) => (
                    <tr
                        key={item.id}
                        className="hover:bg-blue-50/50 transition cursor-pointer"
                    >
                        <td className="px-2 py-4 text-gray-700 font-medium">{index + 1}</td>

                        <td className="px-6 py-4 text-gray-900 font-semibold">
                            {item.judulBuku}
                        </td>

                        <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                {item.kategori?.nama}
                            </span>
                        </td>

                        <td className="px-2 py-4 text-gray-700">{item.pengarang}</td>

                        <td className="px-2 py-2">
                            <span className="font-bold text-green-600">{item.stok}</span>
                        </td>

                        <td className="px-2 py-4 text-gray-700">{item.thTerbit}</td>

                        <td className="px-6 py-4">
                            <img
                                src={item.foto_url}
                                className="w-12 h-16 object-cover rounded-lg shadow-sm border border-gray-200"
                                alt="Foto Buku"
                            />
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="px-2 py-4">
                            <div className="flex items-center gap-2 justify-center">

                                {/* EDIT */}
                                <button
                                    onClick={() => openEdit(item)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition"
                                >
                                    Edit
                                </button>

                                {/* DELETE */}
                                <button
                                    onClick={() => openDelete(item.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition"
                                >
                                    Hapus
                                </button>

                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>

</div>



          {/* MODAL CREATE / EDIT */}
{modalOpen && (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto animate-fadeIn">

        <div className="bg-white/80 backdrop-blur-md border border-white/20 
                        w-full max-w-md rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.18)]
                        my-10 animate-scaleIn">

            <div className="p-8 max-h-[80vh] overflow-y-auto">

                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    {form.id ? (
                        <>
                            <span className="text-yellow-500 text-3xl">✏️</span> Edit Buku
                        </>
                    ) : (
                        <>
                            <span className="text-blue-600 text-3xl">📚</span> Tambah Buku Baru
                        </>
                    )}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* FIELD */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                        <input
                            type="text"
                            placeholder="Masukkan judul buku"
                            value={form.judulBuku}
                            className="w-full border border-gray-300 rounded-xl p-3 
                                       bg-white/80 backdrop-blur-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                            className="w-full border border-gray-300 rounded-xl p-3 
                                       bg-white/80 backdrop-blur-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                            className="w-full border border-gray-300 rounded-xl p-3 
                                       bg-white/80 backdrop-blur-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={(e) =>
                                setForm({ ...form, penerbit: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Tahun Terbit
                            </label>
                            <input
                                type="number"
                                placeholder="2024"
                                value={form.thTerbit}
                                className="w-full border border-gray-300 rounded-xl p-3 
                                           bg-white/80 backdrop-blur-sm
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                onChange={(e) =>
                                    setForm({ ...form, thTerbit: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Stok
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                value={form.stok}
                                className="w-full border border-gray-300 rounded-xl p-3 
                                           bg-white/80 backdrop-blur-sm
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                onChange={(e) =>
                                    setForm({ ...form, stok: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* SELECT */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <select
                            value={form.kategori_id}
                            className="w-full border border-gray-300 rounded-xl p-3 
                                       bg-white/80 backdrop-blur-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

                    {/* UPLOAD */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Foto Buku
                        </label>
                        <input
                            type="file"
                            className="w-full border border-gray-300 rounded-xl p-3 
                                       bg-white/80 backdrop-blur-sm cursor-pointer
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

                    {/* PREVIEW */}
                    {previewImage && (
                        <div className="flex justify-center">
                            <img
                                src={previewImage}
                                alt="preview"
                                className="w-32 h-40 object-cover rounded-xl border-2 border-blue-400 shadow-md"
                            />
                        </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-xl font-semibold border border-gray-300 
                                       text-gray-700 hover:bg-gray-200 transition"
                            onClick={() => setModalOpen(false)}
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 
                                       text-white rounded-xl font-semibold shadow-md hover:shadow-lg
                                       transition-all"
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
        
        <div className="bg-white/80 backdrop-blur-md border border-white/20 
                        p-8 w-full max-w-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                        animate-scaleIn">

            <div className="text-center">
                <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-4xl">🗑️</span>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Hapus Buku?
                </h3>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Data buku yang kamu hapus tidak dapat dipulihkan kembali.
                </p>
            </div>

            <div className="flex justify-center gap-3">
                <button
                    onClick={() => setDeleteModal(false)}
                    className="px-6 py-2 rounded-lg font-semibold border border-gray-300 
                               text-gray-700 hover:bg-gray-200 transition-all duration-200"
                >
                    Batal
                </button>

                <button
                    onClick={confirmDelete}
                    className="px-6 py-2 rounded-lg font-semibold text-white
                               bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg
                               transition-all duration-200"
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