import API from "../_api/index";

// GET semua buku
export const getBuku = async () => {
    try {
        const res = await API.get("/buku");
        console.log("RESPON GET BUKU:", res.data);
        return res.data.data ?? [];
    } catch (err) {
        console.error("ERROR GET BUKU:", err);
        return [];
    }
};

// CREATE buku
export const createBuku = async (data) => {
    try {
        const res = await API.post("/buku", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        console.error("ERROR CREATE BUKU:", err);
        throw err;
    }
};

// SHOW buku by ID
export const showBuku = async (id) => {
    try {
        const res = await API.get(`/buku/${id}`);
        return res.data.data;
    } catch (err) {
        console.error("ERROR SHOW BUKU:", err);
        throw err;
    }
};

// UPDATE buku
export const updateBuku = async (id, data) => {
    try {
        const res = await API.post(`/buku/${id}?_method=PATCH`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (err) {
        console.error("ERROR UPDATE BUKU:", err);
        throw err;
    }
};

// DELETE buku
export const deleteBuku = async (id) => {
    try {
        const res = await API.delete(`/buku/${id}`);
        return res.data;
    } catch (err) {
        console.error("ERROR DELETE BUKU:", err);
        throw err;
    }
};
