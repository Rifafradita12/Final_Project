import { useEffect, useState } from "react";
import { getDenda } from "../../_services/denda";

export default function Denda() {
    const [denda, setDenda] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getDenda();
            setDenda(res.data.data); // sesuaikan dengan response backend
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2>Data Denda</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID Denda</th>
                        <th>Jumlah</th>
                        <th>Status Bayar</th>
                    </tr>
                </thead>

                <tbody>
                    {denda.map((d) => (
                        <tr key={d.id_denda}>
                            <td>{d.id_denda}</td>
                            <td>{d.jumlah}</td>
                            <td>{d.status_bayar}</td>
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
//             "id_denda": 1,
//             "jumlah": 5000,
//             "status_bayar": "BELUM"
//         }
//     ]
// }