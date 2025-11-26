import { useState } from "react";

export default function UserHistories() {
    const [data] = useState([
        {
            id: 1,
            tglPinjam: "2025-09-22",
            tglKembali: "2025-09-30",
            tglTempo: "2025-09-29",
            status: "pin",
            buku_id: 1,
            denda_id: 1,
        },
        {
            id: 2,
            tglPinjam: "2025-10-01",
            tglKembali: null,
            tglTempo: "2025-10-05",
            status: "pin",
            buku_id: 3,
            denda_id: null,
        },
        {
            id: 3,
            tglPinjam: "2025-08-10",
            tglKembali: "2025-08-15",
            tglTempo: "2025-08-14",
            status: "kem",
            buku_id: 2,
            denda_id: null,
        },
        {
            id: 4,
            tglPinjam: "2025-07-01",
            tglKembali: null,
            tglTempo: "2025-07-05",
            status: "pin",
            buku_id: 5,
            denda_id: 2,
        },
        {
            id: 5,
            tglPinjam: "2025-06-12",
            tglKembali: "2025-06-20",
            tglTempo: "2025-06-19",
            status: "kem",
            buku_id: 4,
            denda_id: 1,
        },
    ]);

    // Helper badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "pin":
                return "bg-blue-100 text-blue-800";
            case "kem":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Konversi status
    const labelStatus = (status) => {
        if (status === "pin") return "PINJAM";
        if (status === "kem") return "KEMBALI";
        return status;
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Data Transaksi Sirkulasi</h2>

            {/* Tombol */}
            <div className="flex justify-between items-center mb-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-150">
                    + Tambah Peminjaman
                </button>
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            <th className="py-3 px-4 text-left">ID</th>
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
                                key={item.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                            >
                                <td className="py-3 px-4">{item.id}</td>

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
                                        {labelStatus(item.status)}
                                    </span>
                                </td>

                                <td className="py-3 px-4 text-center">
                                    {item.buku_id}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    {item.denda_id ?? "-"}
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <div className="flex item-center justify-center space-x-2">
                                        {item.status === "pin" ? (
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
