import API from "../_api/index"

export const getBuku = async () => {
    const data = await API.get("/buku")
    return data.data;
};

export const createBuku = async (data) => {
    try {
        const response = await API.post("/buku", data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const showBuku = async (id) => {
    try {
        const { data } = await API.get(`/buku/${id}`)
        return data.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateBuku = async (id, data) => {
    try {
        const response = await API.post(`/buku/${id}`, data)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteBuku = async (id) => {
    try {
        const response = await API.delete(`/buku/${id}`, {
            _method: "DELETE"
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}