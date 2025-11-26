import { useState } from "react";

export default function UserChooseBooks() {
    const kategori = [
        { id: 1, nama: "Novel" },
        { id: 2, nama: "Teknologi" },
        { id: 3, nama: "Pendidikan" },
    ];

    const kategoriColor = {
        1: "bg-pink-100 text-pink-700",
        2: "bg-blue-100 text-blue-700",
        3: "bg-green-100 text-green-700",
    };

    const books = [
        { id: 1, judulBuku: "Ayah", pengarang: "Mail", penerbit: "Gramedia", thTerbit: 2025, foto: "https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1170&auto=format", stok: 20, kategori_id: 1 },
        { id: 2, judulBuku: "Laskar Pelangi", pengarang: "Andrea Hirata", penerbit: "Bentang", thTerbit: 2005, foto: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1000&auto=format", stok: 5, kategori_id: 1 },
        { id: 3, judulBuku: "Belajar React", pengarang: "Fahmi", penerbit: "Informatika", thTerbit: 2024, foto: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1170&auto=format", stok: 12, kategori_id: 2 },
        { id: 4, judulBuku: "Pemrograman Modern", pengarang: "Rizal", penerbit: "Deepublish", thTerbit: 2023, foto: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1000&auto=format", stok: 8, kategori_id: 2 },
        { id: 5, judulBuku: "Matematika Dasar", pengarang: "Budi", penerbit: "Erlangga", thTerbit: 2023, foto: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=735&auto=format", stok: 7, kategori_id: 3 },
        { id: 6, judulBuku: "IPA SD Lengkap", pengarang: "Siti Aminah", penerbit: "Yudhistira", thTerbit: 2022, foto: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=1000&auto=format", stok: 15, kategori_id: 3 },
    ];

    const [selectedKategori, setSelectedKategori] = useState("");

    const filteredBooks = selectedKategori
        ? books.filter((b) => b.kategori_id === Number(selectedKategori))
        : [];

    // 🔥 REKOMENDASI KALO BELUM PILIH KATEGORI → STOK PALING TIPIS
    const recommendedBooks = [...books]
        .sort((a, b) => a.stok - b.stok)
        .slice(0, 3);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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
                        <option key={k.id} value={k.id}>{k.nama}</option>
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
                                <div key={buku.id} className="bg-white border border-gray-200 rounded-xl shadow p-4 hover:shadow-md transition">
                                    <img src={buku.foto} className="w-full h-40 object-cover rounded-lg mb-3 border" />

                                    <h3 className="text-lg font-semibold text-gray-800">{buku.judulBuku}</h3>

                                    <span className={`text-xs px-2 py-1 rounded ${kategoriColor[buku.kategori_id]}`}>
                                        {kategori.find((k) => k.id === buku.kategori_id).nama}
                                    </span>

                                    <p className="text-gray-600 text-sm mt-2">Pengarang: {buku.pengarang}</p>
                                    <p className="text-gray-600 text-sm">Penerbit: {buku.penerbit}</p>
                                    <p className="text-gray-600 text-sm">Tahun Terbit: {buku.thTerbit}</p>

                                    <p className="mt-2 text-sm font-semibold text-red-600">
                                        Stok: {buku.stok}
                                    </p>

                                    <button
                                        onClick={() => openModal(buku)}
                                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
                                    >
                                        Pilih Buku
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : filteredBooks.length === 0 ? (
                    <p className="text-gray-500">Tidak ada buku di kategori ini.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((buku) => (
                            <div key={buku.id} className="bg-white border border-gray-200 rounded-xl shadow p-4 hover:shadow-md transition">
                                <img src={buku.foto} className="w-full h-40 object-cover rounded-lg mb-3 border" />

                                <h3 className="text-lg font-semibold text-gray-800">{buku.judulBuku}</h3>
                                <span className={`text-xs px-2 py-1 rounded ${kategoriColor[buku.kategori_id]}`}>
                                    {kategori.find((k) => k.id === buku.kategori_id).nama}
                                </span>

                                <p className="text-gray-600 text-sm mt-2">Pengarang: {buku.pengarang}</p>
                                <p className="text-gray-600 text-sm">Penerbit: {buku.penerbit}</p>
                                <p className="text-gray-600 text-sm">Tahun Terbit: {buku.thTerbit}</p>

                                <p className={`mt-2 text-sm font-semibold ${buku.stok > 0 ? "text-green-600" : "text-red-600"}`}>
                                    Stok: {buku.stok}
                                </p>

                                <button
                                    disabled={buku.stok === 0}
                                    onClick={() => openModal(buku)}
                                    className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition ${
                                        buku.stok === 0
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                                >
                                    {buku.stok === 0 ? "Stok Habis" : "Pilih Buku"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && selectedBook && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md scale-95 animate-[fadeIn_0.15s_ease-out_forwards]">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Konfirmasi Pilihan</h2>

                        <img src={selectedBook.foto} className="w-full h-48 object-cover rounded-lg mb-4" />

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
