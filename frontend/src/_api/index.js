import axios from "axios";

const url = "http://127.0.0.1:8000";

// Buat satu instance axios saja
const API = axios.create({
    baseURL: `${url}/api`,
});

// Export untuk kebutuhan lain seperti gambar buku
export const bookImageStorage = `${url}/storage`;

// Export default untuk semua service
export default API;
