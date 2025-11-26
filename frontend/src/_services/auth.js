import api from "../_api";

export const login = async ({ email, password }) => {
    try {
        const { data } = await api.post('/login', { email, password });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const { data } = await api.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const register = async ({ nama, jekel, prodi, email, noHP, password }) => {
    try {
        const { data } = await api.post("/register", {
            nama,
            jekel,
            prodi,
            email,
            noHP,
            password,
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

