import { useEffect, useState } from "react";
import { getBuku } from "../../_services/buku";

export default function UserBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        const data = await getBuku();
        const formatted = data.map((item) => ({
            id: item.id,
            judulBuku: item.judulBuku,
            pengarang: item.pengarang,
            penerbit: item.penerbit,
            thTerbit: item.thTerbit,
            foto: item.foto
                ? `http://127.0.0.1:8000/storage/buku/${item.foto}`
                : "https://via.placeholder.com/150",

            stok: item.stok,
            kategori: item.kategori?.namaKategori || "Tidak Ada Kategori",

            // NOTE: kamu bisa ubah sesuai logika sirkulasi nanti
            status: item.stok > 0 ? "Baca Sekarang" : "Dipinjam",
        }));

        setBooks(formatted);
        setLoading(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Buku yang Sedang Kamu Baca
            </h1>

            <div className="overflow-hidden bg-white rounded-xl shadow border border-gray-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-gray-600 font-semibold uppercase text-xs">
                            <th className="py-3 px-4 text-left">Foto</th>
                            <th className="py-3 px-4 text-left">Judul Buku</th>
                            <th className="py-3 px-4 text-left">Pengarang</th>
                            <th className="py-3 px-4 text-left">Kategori</th>
                            <th className="py-3 px-4 text-center">Tahun</th>
                            <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((buku) => (
                            <tr
                                key={buku.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4">
                                    <img
                                        src={buku.foto}
                                        alt={buku.judulBuku}
                                        className="w-12 h-12 rounded object-cover border shadow-sm"
                                    />
                                </td>

                                <td className="py-3 px-4 font-medium text-gray-800">
                                    {buku.judulBuku}
                                </td>

                                <td className="py-3 px-4 text-gray-700">
                                    {buku.pengarang}
                                </td>

                                <td className="py-3 px-4 text-gray-700">
                                    {buku.kategori}
                                </td>

                                <td className="py-3 px-4 text-center text-gray-700">
                                    {buku.thTerbit}
                                </td>

                                <td
                                    className={`py-3 px-4 text-center font-semibold ${
                                        buku.status === "Dipinjam"
                                            ? "text-blue-600"
                                            : buku.status === "Baca Sekarang"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {buku.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
