import { useEffect, useState } from "react";
import API from "../../_api";
import "./UserHistories.css";

export default function UserHistories() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const res = await API.get("/sirkulasi");
            setData(res.data.data ?? []);
        } catch (error) {
            console.error("ERROR:", error);
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
            case "PINJAM":
                return "status-badge status-pinjam";
            case "KEMBALI":
                return "status-badge status-kembali";
            default:
                return "status-badge status-default";
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="history-container">
            <h2 className="history-title">Riwayat Sirkulasi Buku</h2>
            <p className="history-subtitle">Catatan peminjaman dan pengembalian buku kamu.</p>

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
                        {data.map((item) => (
                            <tr key={item.no}>
                                <td>{item.no}</td>
                                <td>{item.tglPinjam}</td>
                                <td>{item.tglKembali ?? "-"}</td>
                                <td className="tempo">{item.tglTempo}</td>

                                <td>
                                    <span className={getStatusClass(item.status)}>
                                        {item.status}
                                    </span>
                                </td>

                                <td>{item.buku}</td>

                                <td>
                                    {item.denda ? (
                                        <div className="denda-info">
                                            <div className="harga">{formatRupiah(item.denda.harga)}</div>
                                            <div className="jenis">{item.denda.jenis}</div>
                                        </div>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td>
                                    {item.status === "PINJAM" ? (
                                        <button className="btn btn-kembali">Kembalikan</button>
                                    ) : (
                                        <button className="btn btn-detail">Detail</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
