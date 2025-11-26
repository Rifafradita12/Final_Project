export default function UserBooks() {
    const books = [
        {
            id: 1,
            judulBuku: "Ayah",
            pengarang: "Mail",
            penerbit: "Gramedia",
            thTerbit: 2025,
            foto: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format",
            stok: 20,
            kategori: "Novel",
            status: "Dipinjam",
        },
        {
            id: 2,
            judulBuku: "Belajar React",
            pengarang: "Fahmi",
            penerbit: "Informatika",
            thTerbit: 2024,
            foto: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format",
            stok: 12,
            kategori: "Pemrograman",
            status: "Dikembalikan",
        },
        {
            id: 3,
            judulBuku: "Laskar Pelangi",
            pengarang: "Andrea Hirata",
            penerbit: "Bentang Pustaka",
            thTerbit: 2005,
            foto: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format",
            stok: 8,
            kategori: "Novel",
            status: "Dipinjam",
        },
        {
            id: 4,
            judulBuku: "Algoritma Dasar",
            pengarang: "Kurniawan",
            penerbit: "Informatika",
            thTerbit: 2021,
            foto: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format",
            stok: 5,
            kategori: "Pemrograman",
            status: "Baca Sekarang",
        },
        {
            id: 5,
            judulBuku: "Sejarah Dunia",
            pengarang: "William J.",
            penerbit: "Erlangga",
            thTerbit: 2019,
            foto: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format",
            stok: 15,
            kategori: "Sejarah",
            status: "Dipinjam",
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Buku yang Sedang Kamu Baca</h1>

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
