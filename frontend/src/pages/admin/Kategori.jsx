import { useEffect, useState } from "react";
import {
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori,
} from "../../_services/kategori";
import "./Kategori.css";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [namaInput, setNamaInput] = useState("");

    useEffect(() => {
        loadKategori();
    }, []);

    const loadKategori = async () => {
        try {
            const res = await getKategori();
            setKategori(Array.isArray(res) ? res : []);
        } catch (err) {
            setError("Gagal memuat kategori");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditMode(false);
        setNamaInput("");
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditMode(true);
        setCurrentId(item.id);
        setNamaInput(item.nama);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!namaInput.trim()) return alert("Nama wajib diisi");

        try {
            if (editMode) {
                await updateKategori(currentId, namaInput);
            } else {
                await createKategori(namaInput);
            }

            setModalOpen(false);
            loadKategori();
        } catch (e) {
            alert("Gagal menyimpan kategori");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Apakah Anda Ingin Menghapus kategori ini?")) return;

        try {
            await deleteKategori(id);
            loadKategori();
        } catch (e) {
            alert("Apakah Anda Ingin menghapus kategori");
        }
    };

    return (
        <div className="kategori-container">

            {/* HEADER */}
            <div className="kategori-header">
                <h2>Kategori Buku</h2>
                <p>Kelola data kategori buku perpustakaan</p>

                <button onClick={openAddModal} className="btn-add">
                    + Tambah Kategori
                </button>
            </div>

            {/* TABLE SECTION */}
            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>NAMA</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>

                    <tbody>
                        {kategori.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="empty-row">
                                    Tidak ada kategori.
                                </td>
                            </tr>
                        ) : (
                            kategori.map((k, index) => (
                                <tr key={k.id}>
                                    <td>{index + 1}</td>
                                    <td>{k.nama}</td>
                                    <td>
                                        <div className="action-col">
                                            <button
                                                className="btn-edit"
                                                onClick={() => openEditModal(k)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(k.id)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>{editMode ? "Edit Kategori" : "Tambah Kategori"}</h3>

                        <input
                            value={namaInput}
                            onChange={(e) => setNamaInput(e.target.value)}
                            placeholder="Nama kategori"
                        />

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setModalOpen(false)}>
                                Batal
                            </button>
                            <button className="btn-save" onClick={handleSubmit}>
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
