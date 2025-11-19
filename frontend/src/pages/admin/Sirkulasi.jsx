import { useEffect, useState } from "react";
import { getSirkulasi } from "../../_services/sirkulasi";

export default function Sirkulasi() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getSirkulasi();
            setData(res.data.data); // sesuaikan dengan response backend
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="p-4">
            <h2>Data Sirkulasi</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID Sirkulasi</th>
                        <th>Tanggal Pinjam</th>
                        <th>Tanggal Kembali</th>
                        <th>Status</th>
                        <th>Tempo Kembali</th>
                        <th>ID User</th>
                        <th>ID Buku</th>
                        <th>ID Denda</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id_sk}>
                            <td>{item.id_sk}</td>
                            <td>{item.tgl_pinjam}</td>
                            <td>{item.tgl_kembali}</td>
                            <td>{item.status}</td>
                            <td>{item.tgl_tempo_kembali}</td>
                            <td>{item.table_anggota_id_anggota}</td>
                            <td>{item.table_buku_id_buku}</td>
                            <td>{item.denda_iddenda}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// data dummy
// {
//     "data": [
//         {
//             "id_sk": 1,
//             "tgl_pinjam": "2024-01-12",
//             "tgl_kembali": "2024-01-17",
//             "status": "PIN",
//             "tgl_tempo_kembali": "2024-01-20",
//             "table_anggota_id_anggota": 3,
//             "table_buku_id_buku": 5,
//             "denda_iddenda": 1
//         }
//     ]
// }