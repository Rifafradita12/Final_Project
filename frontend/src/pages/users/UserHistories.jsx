import { useEffect, useState } from "react";
import API from "../../_api"; // sesuaikan path API-mu

export default function UserHistories() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data dari backend
    const loadData = async () => {
        try {
            const res = await API.get("/sirkulasi");
            console.log("RESPON SIRKULASI:", res.data);

            setData(res.data.data ?? []);
        } catch (error) {
            console.error("ERROR GET SIRKULASI:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "PINJAM":
                return "bg-blue-100 text-blue-800";
            case "KEMBALI":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Format uang
    const formatRupiah = (value) => {
        if (!value || value === "-") return "-";
        return "Rp " + value.toLocaleString("id-ID");
    };

    if (loading)
        return <div className="p-8 text-center text-gray-700">Loading...</div>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                📋 Data Transaksi Sirkulasi
            </h2>

            

            {/* Tabel Responsif */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            <th className="py-3 px-4 text-left">No</th>
                            <th className="py-3 px-4 text-left">Tgl Pinjam</th>
                            <th className="py-3 px-4 text-left">Tgl Kembali</th>
                            <th className="py-3 px-4 text-left">Tempo</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Buku</th>
                            <th className="py-3 px-4 text-center">Denda</th>
                            <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 text-sm font-light">
                        {data.map((item) => (
                            <tr
                                key={item.no}
                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                            >
                                <td className="py-3 px-4">{item.no}</td>

                                <td className="py-3 px-4">{item.tglPinjam}</td>

                                <td className="py-3 px-4">
                                    {item.tglKembali ?? "-"}
                                </td>

                                <td className="py-3 px-4 text-red-500 font-medium">
                                    {item.tglTempo}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <span
                                        className={`py-1 px-3 rounded-full text-xs font-semibold uppercase ${getStatusBadge(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="py-3 px-4 text-center">
                                    {item.buku}
                                </td>

                                <td className="py-3 px-4 text-center font-medium">
                                    {item.denda ? (
                                        <>
                                            <div className="font-semibold">{formatRupiah(item.denda.harga)}</div>
                                            <div className="text-xs text-gray-500">{item.denda.jenis}</div>
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        {item.status === "PINJAM" ? (
                                            <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-2 rounded-lg">
                                                Kembalikan
                                            </button>
                                        ) : (
                                            <button className="text-gray-500 hover:text-gray-800 text-xs font-medium">
                                                Detail
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
