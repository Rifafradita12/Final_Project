import { useEffect, useState } from "react";
import { getSirkulasi } from "../../_services/sirkulasi";

export default function Sirkulasi() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getSirkulasi();
            // getSirkulasi return array langsung
            setData(Array.isArray(res) ? res : []);
            setLoading(false);
        } catch (err) {
            setError("Gagal memuat data.");
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-5">📘 Data Sirkulasi</h2>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">No</th>
                            <th className="py-3 px-4 text-left">Tgl Pinjam</th>
                            <th className="py-3 px-4 text-left">Tgl Kembali</th>
                            <th className="py-3 px-4 text-left">Tempo</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Buku</th>
                            <th className="py-3 px-4 text-center">Denda</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-4 text-center text-gray-500">
                                    Tidak ada data.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item.id || index} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{item.tglPinjam}</td>
                                    <td className="py-3 px-4">{item.tglKembali}</td>
                                    <td className="py-3 px-4 text-red-600">{item.tglTempo}</td>

                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                                            item.status === "PINJAM"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 text-center">{item.buku}</td>
                                    <td className="py-3 px-4 text-center">{item.denda}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
