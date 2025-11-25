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

export const register = async ({ name, username, email, password }) => {
    try {
        const { data } = await api.post("/register", {
            name,
            username,
            email,
            password,
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
