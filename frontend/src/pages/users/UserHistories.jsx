import { useEffect, useState } from "react";
import API from "../../_api";
import { kembalikanBuku } from "../../_services/sirkulasi";
import { BookOpen } from "lucide-react";
import "./UserHistories.css";

export default function UserHistories() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);

    const loadData = async () => {
        try {
            const res = await API.get("/sirkulasi");
            setData(res.data.data ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const formatRupiah = (value) => {
        if (!value || value === "-") return "-";
        return "Rp " + value.toLocaleString("id-ID");
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "PINJAM": return "status-badge status-pinjam";
            case "KEMBALI": return "status-badge status-kembali";
            default: return "status-badge status-default";
        }
    };

    const handleKembalikan = async (id) => {
        if (!window.confirm("Yakin ingin mengembalikan buku ini?")) return;
        setProcessing(id);

        try {
            await kembalikanBuku(id);
            alert("Buku berhasil dikembalikan!");
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengembalikan buku!");
        } finally {
            setProcessing(null);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <span className="loading-spinner"></span> Loading...
            </div>
        );
    }

    return (
<div className="history-container">

    {/* TITLE */}
    <h1 className="history-title">Riwayat Peminjaman</h1>
    <p className="history-subtitle">Semua data transaksi peminjaman dan pengembalian buku</p>

    {/* TABLE */}
    <div className="table-wrapper">
        <table className="history-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tgl Pinjam</th>
                    <th>Tgl Kembali</th>
                    <th>Batas Tempo</th>
                    <th>Status</th>
                    <th>Buku</th>
                    <th>Denda</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>2025-09-22</td>
                    <td>2025-09-30</td>

                    <td>
                        <span className="badge-tempo">2025-09-29</span>
                    </td>

                    <td>
                        <span className="status-badge status-pinjam">Pinjam</span>
                    </td>

                    <td>
                        <div style={{ lineHeight: "1.2" }}>
                            <p className="font-semibold">Ayah</p>
                            <p className="text-xs text-gray-500">Muhammad Khalid Shafwanl</p>
                        </div>
                    </td>

                    <td>
                        <span className="denda-box">
                            <p className="harga">-</p>
                        </span>
                    </td>

                    <td>
                        <button className="btn btn-primary">Kembalikan</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    {/* SUMMARY */}
    <div className="summary-section">
        <div className="summary-card1">
            <p className="summary-label">Total Peminjaman</p>
            <p className="summary-value">1</p>
        </div>
        <div className="summary-card2">
            <p className="summary-label">Sudah Dikembalikan</p>
            <p className="summary-value">0</p>
        </div>
        <div className="summary-card3">
            <p className="summary-label">Masih Dipinjam</p>
            <p className="summary-value">1</p>
        </div>
    </div>

</div>
    );
}
