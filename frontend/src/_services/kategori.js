import api from "../_api"; // axios instance kamu

export const getKategori = async () => {
    const data = await api.get("/kategori");
    return data.data;
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
