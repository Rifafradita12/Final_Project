import { useEffect, useState } from "react";
import { getUsers } from "../../_services/users";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data.data); // sesuaikan dengan response backend
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2>Data Users</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>Prodi</th>
                        <th>Email</th>
                        <th>No HP</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id_user}>
                            <td>{u.id_user}</td>
                            <td>{u.nama}</td>
                            <td>{u.jekel}</td>
                            <td>{u.prodi}</td>
                            <td>{u.Email}</td>
                            <td>{u.No_HP}</td>
                            <td>{u.role}</td>
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
//             "id_user": 1,
//             "nama": "Fahmi",
//             "jekel": "L",
//             "prodi": "TI",
//             "Email": "fahmi@gmail.com",
//             "No_HP": "0812345678",
//             "role": "anggota"
//         }
//     ]
// }
