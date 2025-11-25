import api from "../libs/apis/api";

export async function getUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found.");

        const response = await api.get("/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // return only the user object for convenience
        return response.data.data.user;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to fetch user.");
        }
        throw new Error(error.message || "Network error.");
    }
}

export async function updateFeeling(feeling) {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found.");

        const response = await api.post(
            "/user/select-feeling",
            { feeling },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return response.data.data.user; // returns updated user object
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to update feeling.");
        }
        throw new Error(error.message || "Network error.");
    }
}

export async function GetAllUsers() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found.");

        const response = await api.get(
            "/user/all",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Make sure it returns an array
        return response.data.data.users || [];
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to get all users");
        }
        throw new Error(error.message || "Network error.");
    }
}