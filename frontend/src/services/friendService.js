import api from "../libs/apis/api";

export async function SendRequest(targetId) {
    const token = localStorage.getItem("token");
    const response = await api.post(
        `/user/send-request/${targetId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}

export async function CancelRequest(targetId) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.delete(
        `/user/request/${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}

export async function CheckRequest(targetId) {
    const token = localStorage.getItem("token");
    const response = await api.get(
        `/user/check-request/${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}

export async function GetPendingRequest() {
    const token = localStorage.getItem("token");
    const response = await api.get(
        `/user/pending-requests`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}

export async function GetFriends() {
    const token = localStorage.getItem("token");
    const response = await api.get(
        `/user/friends`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}