import { useEffect, useState } from "react";
import { getKategori } from "../../_services/kategori";
import { getBuku, createBuku } from "../../_services/buku";

export default function AdminBuku() {
    const [kategori, setKategori] = useState([]);
    const [buku, setBuku] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
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
        const res = await getKategori();
        setKategori(res.data);
        console.log(res.data)
    };

    const loadBuku = async () => {
        const res = await getBuku();
        setBuku(res.data);
        console.log(res.data);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        try {
            await createBuku(formData);
            setModalOpen(false);
            loadBuku();
        } catch (err) {
            console.error(err);
            alert("Gagal menambah buku");
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Manajemen Buku</h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Tambah Buku
                </button>
            </div>

            {/* TABLE LIST BUKU */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="py-3 px-6">Judul</th>
                            <th className="py-3 px-6">Kategori</th>
                            <th className="py-3 px-6">Pengarang</th>
                            <th className="py-3 px-6">Stok</th>
                            <th className="py-3 px-6">Tahun</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL TAMBAH BUKU */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Tambah Buku Baru</h3>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            <input
                                type="text"
                                placeholder="Judul Buku"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, judulBuku: e.target.value})}
                            />

                            <input
                                type="text"
                                placeholder="Pengarang"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, pengarang: e.target.value})}
                            />

                            <input
                                type="text"
                                placeholder="Penerbit"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, penerbit: e.target.value})}
                            />

                            <input
                                type="number"
                                placeholder="Tahun Terbit"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, thTerbit: e.target.value})}
                            />

                            <input
                                type="number"
                                placeholder="Stok"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, stok: e.target.value})}
                            />

                            {/* SELECT KATEGORI (getKategori) */}
                            <select
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, kategori_id: e.target.value})}
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((k) => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama}
                                    </option>
                                ))}
                            </select>

                            {/* Foto */}
                            <input
                                type="file"
                                className="w-full border rounded p-2"
                                onChange={(e) => setForm({...form, foto: e.target.files[0]})}
                            />

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
        </div>
    );
}
