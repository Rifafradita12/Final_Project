import API from "../_api/index";

// GET semua kategori
export const getKategori = async () => {
    try {
        const res = await API.get("/kategori");
        console.log("RESPON GET KATEGORI:", res.data);
        return res.data.data ?? [];
    } catch (err) {
        console.error("ERROR GET KATEGORI:", err);
        return [];
    }
};

// CREATE kategori
export const createKategori = async (nama) => {
    try {
        const res = await API.post("/kategori", { nama });
        return res.data.data;
    } catch (err) {
        console.error("ERROR CREATE KATEGORI:", err);
        throw err;
    }
};

// UPDATE kategori
export const updateKategori = async (id, nama) => {
    try {
        const res = await API.put(`/kategori/${id}`, { nama });
        return res.data.data;
    } catch (err) {
        console.error("ERROR UPDATE KATEGORI:", err);
        throw err;
    }
};

// DELETE kategori
export const deleteKategori = async (id) => {
    try {
        const res = await API.delete(`/kategori/${id}`);
        return res.data.message;
    } catch (err) {
        console.error("ERROR DELETE KATEGORI:", err);
        throw err;
    }
};
