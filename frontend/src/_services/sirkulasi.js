import api from "../_api";

// GET semua sirkulasi
export const getSirkulasi = async () => {
    try {
        const res = await api.get("/sirkulasi");
        console.log("RESPON GET SIRKULASI:", res.data);
        return res.data.data ?? [];
    } catch (err) {
        console.error("ERROR GET SIRKULASI:", err);
        return [];
    }
};

// PINJAM BUKU
export const pinjamBuku = async (buku_id) => {
    try {
        const res = await api.post("/sirkulasi/pinjam", { buku_id });
        return res.data.data;
    } catch (err) {
        console.error("ERROR PINJAM BUKU:", err);
        throw err;
    }
};

// KEMBALIKAN BUKU
export const kembalikanBuku = async (id) => {
    try {
        const res = await api.post(`/sirkulasi/kembalikan/${id}`);
        return res.data;
    } catch (err) {
        console.error("ERROR KEMBALIKAN BUKU:", err);
        throw err;
    }
};

// ACC PENGEMBALIAN BUKU (Admin)
export const accKembali = async (id) => {
    try {
        const res = await api.post(`/sirkulasi/acc/${id}`);
        return res.data;
    } catch (err) {
        console.error("ERROR ACC KEMBALIKAN:", err);
        throw err;
    }
};

// GET detail sirkulasi
export const getSirkulasiDetail = async (id) => {
    try {
        const res = await api.get(`/sirkulasi/${id}`);
        return res.data.data;
    } catch (err) {
        console.error("ERROR GET DETAIL SIRKULASI:", err);
        throw err;
    }
};

// UPDATE sirkulasi
export const updateSirkulasi = async (id, data) => {
    try {
        const res = await api.put(`/sirkulasi/${id}`, data);
        return res.data.data;
    } catch (err) {
        console.error("ERROR UPDATE SIRKULASI:", err);
        throw err;
    }
};

// DELETE sirkulasi
export const deleteSirkulasi = async (id) => {
    try {
        const res = await api.delete(`/sirkulasi/${id}`);
        return res.data.message;
    } catch (err) {
        console.error("ERROR DELETE SIRKULASI:", err);
        throw err;
    }
};
