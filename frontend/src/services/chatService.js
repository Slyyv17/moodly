import api from "../libs/apis/api";

export async function SendChat(message, receiverId) {
    const token = localStorage.getItem("token");
    const response = await api.post(
        `/chat/sendChat`,
        { message, receiver: receiverId }, // matches backend
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}