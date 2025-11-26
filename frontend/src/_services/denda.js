import api from "../_api";

export function getDenda() {
    return api.get("/denda");
}

export const createDenda = async (jumlah) => {
    return await api.post("/denda", { jumlah });
};

export const deleteDenda = async (id) => {
    return await api.delete(`/denda/${id}`);
};

export const updateDenda = async (id, jumlah) => {
    return await api.put(`/denda/${id}`, { jumlah });
};
