import { useEffect, useState } from "react";
import { getKategori } from "../../_services/kategori";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        loadKategori();
    }, []);

    const loadKategori = async () => {
        try {
            const res = await getKategori();
            setKategori(res.data.data); // sesuaikan dengan response backend
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <div className="p-4">
            <h2>Data Kategori Buku</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID Kategori</th>
                        <th>Nama Kategori</th>
                    </tr>
                </thead>

                <tbody>
                    {kategori.map((k) => (
                        <tr key={k.id_kategori}>
                            <td>{k.id_kategori}</td>
                            <td>{k.nama}</td>
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
//             "id_kategori": 1,
//             "nama": "Novel"
//         }
//     ]
// }