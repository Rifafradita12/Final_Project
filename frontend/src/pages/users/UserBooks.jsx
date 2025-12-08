import { useEffect, useState } from "react";
import { getBuku } from "../../_services/buku";
import { getSirkulasi } from "../../_services/sirkulasi";
import "./UserBooks.css";

export default function UserBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = userData.id;

        // Get all books and sirkulasi data
        const [booksData, sirkulasiData] = await Promise.all([
            getBuku(),
            getSirkulasi()
        ]);

        // Filter sirkulasi for current user with status 'PINJAM'
        const userBorrowedBooks = sirkulasiData
            .filter(item => item.namaUser === userData.nama && item.status === "PINJAM")
            .map(item => item.buku?.id);

        const formatted = booksData.map((item) => {
            let status = "Tersedia";
            
            // Check if current user is borrowing this book
            if (userBorrowedBooks.includes(item.id)) {
                status = "Sedang Dibaca";
            } else if (item.stok === 0) {
                status = "Tidak Tersedia";
            }

            return {
                id: item.id,
                judulBuku: item.judulBuku,
                pengarang: item.pengarang,
                penerbit: item.penerbit,
                thTerbit: item.thTerbit,
                foto: item.foto
                    ? `https://be-e-library-sibm3.karyakreasi.id/storage/buku/${item.foto}`
                    : "https://via.placeholder.com/150",
                stok: item.stok,
                kategori: item.kategori?.nama || "Tidak Ada Kategori",
                status: status,
            };
        });

        setBooks(formatted);
        setLoading(false);
    };

    if (loading) return <p className="ub-loading">Loading...</p>;

    return (
        <div className="ub-container">
            <div className="ub-header">
                <h1 className="ub-title">Buku yang Sedang Kamu Baca</h1>
                <p className="ub-subtitle">
                    Lihat aktivitas bacaan kamu dengan tampilan yang lebih nyaman.
                </p>
            </div>

            <div className="ub-table-wrapper">
                <table className="ub-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Judul Buku</th>
                            <th>Pengarang</th>
                            <th>Kategori</th>
                            <th>Tahun</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((buku) => (
                            <tr key={buku.id}>
                                <td>
                                    <img src={buku.foto} className="ub-image" />
                                </td>

                                <td className="ub-judul">{buku.judulBuku}</td>

                                <td>{buku.pengarang}</td>
                                <td>{buku.kategori}</td>
                                <td className="ub-center">{buku.thTerbit}</td>

                                <td
                                    className={`ub-status ${
                                        buku.status === "Sedang Dibaca"
                                            ? "ub-red"
                                            : buku.status === "Tidak Tersedia"
                                            ? "ub-gray"
                                            : "ub-green"
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
