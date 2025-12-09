import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBuku } from "../../_services/buku";
import { getKategori } from "../../_services/kategori";
import { pinjamBuku } from "../../_services/sirkulasi";

import "./UserChooseBooks.css";

export default function UserChooseBooks() {
    const [searchParams] = useSearchParams();
    const [kategori, setKategori] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedKategori, setSelectedKategori] = useState("");
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const kategoriRes = await getKategori();
            const bukuRes = await getBuku();

            setKategori(kategoriRes);
            setBooks(bukuRes);

            const kategoriFromUrl = searchParams.get("kategori");
            if (kategoriFromUrl) {
                setSelectedKategori(kategoriFromUrl);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const kategoriColor = {
        1: "badge pink",
        2: "badge blue",
        3: "badge green",
        4: "badge yellow",
    };

    const filteredBooks = selectedKategori
        ? books.filter((b) => b.kategori_id === Number(selectedKategori))
        : [];

    const recommendedBooks = [...books]
        .sort((a, b) => a.stok - b.stok)
        .slice(0, 3);

    const openModal = (buku) => {
        setSelectedBook(buku);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setModalOpen(false);
    };

    const handleConfirm = async () => {
        if (!selectedBook) return;

        setProcessing(true);

        try {
            await pinjamBuku(selectedBook.id);
            alert(`Buku "${selectedBook.judulBuku}" berhasil dipinjam!`);
            loadData(); // Refresh data untuk update stok
            closeModal();
        } catch (error) {
            const message = error.response?.data?.message || "Gagal meminjam buku!";
            alert(message);
            console.error("Error:", error);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <div className="choose-container">
            {/* TITLE */}
            <h1 className="choose-title">Pilih Buku</h1>
            <p className="choose-subtitle">
                Pilih kategori untuk melihat daftar buku atau lihat rekomendasi stok rendah.
            </p>

            {/* DROPDOWN */}
            <div className="dropdown-container">
                <label className="dropdown-label">Pilih Kategori</label>
                <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    className="dropdown-select"
                >
                    <option value="">-- Pilih Kategori --</option>

                    {kategori.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.nama}
                        </option>
                    ))}
                </select>
            </div>

            {/* BOOK LIST */}
            <h2 className="choose-section-title">Daftar Buku</h2>

            {selectedKategori === "" ? (
                <>
                    <p className="recommend-text">
                        Berikut rekomendasi buku dengan stok paling sedikit:
                    </p>

                    <div className="book-grid">
                        {recommendedBooks.map((buku) => (
                            <BookCard
                                key={buku.id}
                                buku={buku}
                                kategori={kategori}
                                kategoriColor={kategoriColor}
                                onSelect={() => openModal(buku)}
                            />
                        ))}
                    </div>
                </>
            ) : filteredBooks.length === 0 ? (
                <p className="empty-text">Tidak ada buku dalam kategori ini.</p>
            ) : (
                <div className="book-grid">
                    {filteredBooks.map((buku) => (
                        <BookCard
                            key={buku.id}
                            buku={buku}
                            kategori={kategori}
                            kategoriColor={kategoriColor}
                            onSelect={() => openModal(buku)}
                        />
                    ))}
                </div>
            )}

            {/* MODAL */}
            {modalOpen && selectedBook && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2 className="modal-title">Konfirmasi Pilihan</h2>

                        <img
                            src={
                                selectedBook.foto
                                    ? `https://be-e-Library-sibm3.karyakreasi.id/storage/buku/${selectedBook.foto}`
                                    : "https://via.placeholder.com/150"
                            }
                            className="modal-img"
                        />

                        <p className="modal-book-title">{selectedBook.judulBuku}</p>
                        <p className="modal-text">Pengarang: {selectedBook.pengarang}</p>
                        <p className="modal-text">Stok: {selectedBook.stok}</p>

                        <div className="modal-buttons">
                            <button onClick={closeModal} className="btn-cancel" disabled={processing}>
                                Batal
                            </button>
                            <button onClick={handleConfirm} className="btn-confirm" disabled={processing}>
                                {processing ? "Memproses..." : "Konfirmasi"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function BookCard({ buku, kategori, kategoriColor, onSelect }) {
    const kategoriName = kategori.find((k) => k.id === buku.kategori_id);

    return (
        <div className="book-card">
            <img
                src={
                    buku.foto
                        ? `https://be-e-Library-sibm3.karyakreasi.id/storage/buku/${buku.foto}`
                        : "https://via.placeholder.com/150"
                }
                className="book-img"
            />

            <h3 className="book-title">{buku.judulBuku}</h3>

            <span className={kategoriColor[buku.kategori_id] || "badge gray"}>
                {kategoriName?.nama || "Tidak Ada Kategori"}
            </span>

            <p className="book-info">Pengarang: {buku.pengarang}</p>
            <p className="book-info">Penerbit: {buku.penerbit}</p>
            <p className="book-info">Tahun Terbit: {buku.thTerbit}</p>

            <p className={`book-stock ${buku.stok > 0 ? "green" : "red"}`}>
                Stok: {buku.stok}
            </p>

            <button
                disabled={buku.stok === 0}
                onClick={onSelect}
                className={`btn-select ${buku.stok === 0 ? "disabled" : ""}`}
            >
                {buku.stok === 0 ? "Stok Habis" : "Pilih Buku"}
            </button>
        </div>
    );
}
