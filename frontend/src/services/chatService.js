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

// Fetch chat history between the logged-in user and a friend
export async function GetChatHistory(friendId) {
  const token = localStorage.getItem("token");

  // Frontend doesn't need to pass user1, backend can use token for sender
  const response = await api.get(`/chat?user2=${friendId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data; // { status, results, data: [...] }
}