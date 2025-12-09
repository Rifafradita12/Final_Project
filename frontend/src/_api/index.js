import axios from "axios";

// const url = "http://be-e-library-sibm3.karyakreasi.id";
const url = "https://be-e-Library-sibm3.karyakreasi.id";

// Buat satu instance axios saja
const API = axios.create({
    baseURL: `${url}/api`,
});

// Attach token from localStorage to every request if present
API.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            // ignore localStorage errors
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Export untuk kebutuhan lain seperti gambar buku
export const bookImageStorage = `${url}/storage`;

// Export default untuk semua service
export default API;
