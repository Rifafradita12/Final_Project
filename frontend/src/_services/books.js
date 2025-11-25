import { API } from "../_api/index"

export const getBooks = async () => {
    const { data } = await API.get("/books")
    return data.data;
};

export const createBook = async (data) => {
    try {
        const response = await API.post("/books", data)
        return respons.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const showBook = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`)
        return data.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateBook = async (id, data) => {
    try {
        const response = await API.post(`/books/${id}`, data)
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteBook = async (id) => {
    try {
        const response = await API.delete(`/books/${id}`, {
            _method: "DELETE"
        })
    } catch (error) {
        console.log(error);
        throw error
    }
}