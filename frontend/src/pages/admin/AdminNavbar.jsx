import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <div className="flex flex-col p-4 h-full bg-gray-800 shadow-xl w-64">

            <h3 className="text-white text-2xl font-semibold mb-6">
                📚 Admin Panel
            </h3>

            {/* Navigation List */}
            <ul className="flex flex-col space-y-2 flex-grow">

                {/* Item Dashboard */}
                <li className="nav-item">
                    {/* Ganti: className="nav-link text-white" */}
                    <Link
                        to="/"
                        className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l-2 2m-2-2m-7 7h10v10a1 1 0 01-1 1h-3m-3-3v3m0 0v-3"></path></svg>
                        Dashboard
                    </Link>
                </li>

                {/* Item Data Perpustakaan */}
                <li>
                    <Link
                        to="/perpustakaan"
                        className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 010-4m0 4a2 2 001-4m-7 7h7m-7 0a2 2 010-4m0 4a2 2 001-4m-7 7h7m-7 0a2 2 010-4m0 4a2 2 001-4"></path></svg>
                        Data Pengguna
                    </Link>
                </li>

                {/* Item Data Buku */}
                <li>
                    <Link
                        to="/buku"
                        className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.467 9.5 5 8 5c-3.1 0-5.55 3.5-3.55 7S4.9 19 8 19c1.5 0 2.832-.467 4-1.253m0-13C13.168 5.467 14.5 5 16 5c3.1 0 5.55 3.5 3.55 7s-1.45 7-3.55 7c-1.5 0-2.832-.467-4-1.253"></path></svg>
                        Data Buku
                    </Link>
                </li>

                {/* Item Contoh Link Tambahan */}
                <li>
                    <Link
                        to="/sirkulasi"
                        className="flex items-center p-3 text-white rounded-lg hover:bg-gray-700 transition duration-150 ease-in-out"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v4m0 0v1h18v-1M3 14H1c0 0 0 0 0 0"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v4m0 0v1h18v-1m-4 0h-4m-4 0H5"></path></svg>
                        Sirkulasi
                    </Link>
                </li>

            </ul>

            <hr className="my-4 border-gray-700" />

            {/* Logout/Home (Jika tujuannya Logout atau kembali ke halaman publik) */}
            <div>
                <Link
                    to="/home"
                    className="flex items-center p-3 text-white rounded-lg hover:bg-red-600 bg-red-500 transition duration-150 ease-in-out font-bold"
                >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V4"></path></svg>
                    Logout
                </Link>
            </div>

        </div>
    );
};

export default AdminNavbar;