import { useEffect, useState } from "react";
import { getBuku } from "../../_services/buku";
import { getKategori } from "../../_services/kategori";

export default function UserChooseBooks() {
    const [kategori, setKategori] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedKategori, setSelectedKategori] = useState("");
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Load kategori & buku dari backend
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const kategoriRes = await getKategori();
            const bukuRes = await getBuku();

            setKategori(kategoriRes);
            setBooks(bukuRes);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Color badge kategori
    const kategoriColor = {
        1: "bg-pink-100 text-pink-700",
        2: "bg-blue-100 text-blue-700",
        3: "bg-green-100 text-green-700",
        4: "bg-yellow-100 text-yellow-700",
    };

    // Filter berdasarkan kategori
    const filteredBooks = selectedKategori
        ? books.filter((b) => b.kategori_id === Number(selectedKategori))
        : [];

    // Rekomendasi stok paling sedikit
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

    const handleConfirm = () => {
        alert(`Buku "${selectedBook.judulBuku}" berhasil dipilih!`);
        closeModal();
    };

    if (loading) return <p className="text-gray-600">Loading...</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">Pilih Buku Berdasarkan Kategori</h1>

            {/* Dropdown */}
            <div className="w-full max-w-sm">
                <label className="block text-gray-700 font-medium mb-2">Pilih Kategori</label>
                <select
                    value={selectedKategori}
                    onChange={(e) => setSelectedKategori(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-gray-700"
                >
                    <option value="">-- Pilih Kategori --</option>

                    {kategori.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.nama}
                        </option>
                    ))}
                </select>
            </div>

            {/* Buku */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Daftar Buku</h2>

                {selectedKategori === "" ? (
                    <>
                        <p className="text-gray-600 mb-4">
                            Belum memilih kategori. Berikut rekomendasi buku dengan stok paling sedikit:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-gray-500">Tidak ada buku di kategori ini.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>

            {/* Modal */}
            {modalOpen && selectedBook && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Konfirmasi Pilihan</h2>

                        <img
                            src={
                                selectedBook.foto
                                    ? `http://127.0.0.1:8000/storage/buku/${selectedBook.foto}`
                                    : "https://via.placeholder.com/150"
                            }
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <p className="text-lg font-semibold">{selectedBook.judulBuku}</p>
                        <p className="text-gray-600">Pengarang: {selectedBook.pengarang}</p>
                        <p className="text-gray-600">Stok: {selectedBook.stok}</p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                                Batal
                            </button>
                            <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 🔥 Component Kartu Buku (biar clean)
function BookCard({ buku, kategori, kategoriColor, onSelect }) {
    const kategoriName = kategori.find((k) => k.id === buku.kategori_id);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow p-4 hover:shadow-md transition">
            <img
                src={
                    buku.foto
                        ? `http://127.0.0.1:8000/storage/buku/${buku.foto}`
                        : "https://via.placeholder.com/150"
                }
                className="w-full h-40 object-cover rounded-lg mb-3 border"
            />

            <h3 className="text-lg font-semibold text-gray-800">{buku.judulBuku}</h3>

            <span
                className={`text-xs px-2 py-1 rounded ${
                    kategoriColor[buku.kategori_id] || "bg-gray-200 text-gray-700"
                }`}
            >
                {kategoriName?.nama || "Tidak Ada Kategori"}
            </span>

            <p className="text-gray-600 text-sm mt-2">Pengarang: {buku.pengarang}</p>
            <p className="text-gray-600 text-sm">Penerbit: {buku.penerbit}</p>
            <p className="text-gray-600 text-sm">Tahun Terbit: {buku.thTerbit}</p>

            <p
                className={`mt-2 text-sm font-semibold ${
                    buku.stok > 0 ? "text-green-600" : "text-red-600"
                }`}
            >
                Stok: {buku.stok}
            </p>

            <button
                disabled={buku.stok === 0}
                onClick={onSelect}
                className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition ${
                    buku.stok === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
                {buku.stok === 0 ? "Stok Habis" : "Pilih Buku"}
            </button>
        </div>
    );
}
