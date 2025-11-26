import api from "../_api"; // axios instance kamu

export const getKategori = async () => {
    return await api.get("/kategori");
};

export const createKategori = async (nama) => {
    return await api.post("/kategori", { nama });
};

export const deleteKategori = async (id) => {
    return await api.delete(`/kategori/${id}`);
};

export const updateKategori = async (id, nama) => {
    return await api.put(`/kategori/${id}`, { nama });
};
