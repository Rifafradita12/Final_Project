import { useEffect, useState } from "react";
import { getDenda } from "../../_services/denda"; 

export default function Denda() {
    const [denda, setDenda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State untuk penanganan error

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getDenda();
            // Sesuaikan dengan response backend (asumsi format: { data: { data: [...] } })
            setDenda(res.data.data); 
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data denda. Silakan coba lagi.");
            setLoading(false);
        }
    };

    // --- Tampilan Loading dan Error ---
    if (loading) {
        return <div className="p-8 text-center text-xl font-medium">Memuat Data Denda...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>;
    }
    // ------------------------------------

    return (
        <div className="p-8">
            {/* Header dengan Styling Tailwind */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Data Denda Anggota</h2>

            {/* Container Tabel dengan Shadow dan Rounded Corner */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                {/* Tabel */}
                <table className="min-w-full leading-normal">
                    {/* Header Tabel */}
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600 uppercase text-sm font-semibold tracking-wider">
                            <th className="py-3 px-6 text-left">ID Denda</th>
                            <th className="py-3 px-6 text-right">Jumlah</th>
                            <th className="py-3 px-6 text-center">Status Bayar</th>
                        </tr>
                    </thead>

                    {/* Body Tabel */}
                    <tbody className="text-gray-700 text-sm font-light">
                        {denda.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-5 px-6 text-center">
                                    Tidak ada data denda yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            denda.map((d) => (
                                <tr 
                                    key={d.id_denda} 
                                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {d.id_denda}
                                    </td>
                                    
                                    {/* Format jumlah sebagai Rupiah */}
                                    <td className="py-3 px-6 text-right font-medium">
                                        {new Intl.NumberFormat('id-ID', { 
                                            style: 'currency', 
                                            currency: 'IDR',
                                            minimumFractionDigits: 0
                                        }).format(d.jumlah)}
                                    </td>
                                    
                                    {/* Status Bayar dengan Badge Styling */}
                                    <td className="py-3 px-6 text-center">
                                        <span className={`py-1 px-3 rounded-full text-xs font-medium 
                                            ${d.status_bayar === 'BAYAR' 
                                                ? 'bg-green-200 text-green-800' 
                                                : 'bg-red-200 text-red-800'
                                            } uppercase`}
                                        >
                                            {d.status_bayar}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}