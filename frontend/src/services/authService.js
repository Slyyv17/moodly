import api from "../libs/apis/api";

export async function registerUser({ username, email, password }) {
    try {
        const response = await api.post('/auth/user/register', { username, email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Registration failed.');
        }
        throw new Error('Network error or CORS issue.');
    }
}
export async function loginUser({ email, password }) {
    try {
        const response = await api.post("/auth/user/login", { email, password });
        return response.data; // { user, token }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Login failed.");
        }
        throw new Error("Network error or CORS issue.");
    }
}
