import { useEffect, useState } from "react";
import { getBooks } from "../../_services/books";

export default function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const res = await getBooks();
            setBooks(res.data.data); // sesuaikan dengan response backend
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2>Daftar Buku</h2>
            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Judul</th>
                        <th>Pengarang</th>
                        <th>Penerbit</th>
                        <th>Tahun</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id_buku}>
                            <td>{book.id_buku}</td>
                            <td>{book.judul_buku}</td>
                            <td>{book.pengarang}</td>
                            <td>{book.penerbit}</td>
                            <td>{book.th_terbit}</td>
                            <td>{book.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
