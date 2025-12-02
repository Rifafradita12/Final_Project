import { useEffect, useState } from "react";
import { getBuku } from "../../_services/buku";
import "./UserBooks.css";

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
            kategori: item.kategori?.nama || "Tidak Ada Kategori",
            status: item.stok > 0 ? "Baca Sekarang" : "Dipinjam",
        }));

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
                                        buku.status === "Dipinjam"
                                            ? "ub-blue"
                                            : buku.status === "Baca Sekarang"
                                            ? "ub-green"
                                            : "ub-gray"
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
