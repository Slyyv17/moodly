import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SendChat } from "../services/chatService"; // your chat service

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);

    const [searchParams] = useSearchParams();
    const receiverId = searchParams.get("receiverId");
    const receiverName = searchParams.get("username");

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        setSending(true);
        try {
            // fixed: matches backend { message, receiver }
            const chat = await SendChat(newMessage, receiverId);
            setMessages((prev) => [...prev, chat]);
            setNewMessage("");
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#120F22] text-white">
            {/* Header */}
            <header className="p-4 bg-[#120F22]/90 border-b border-gray-700">
                <h2 className="text-xl font-bold">Chat with {receiverName}</h2>
            </header>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 && (
                    <p className="text-white/50 text-center mt-4">No messages yet</p>
                )}
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded ${msg.sender === receiverId
                                ? "bg-gray-700 self-start"
                                : "bg-sky-500 self-end"
                            } max-w-xs`}
                    >
                        {msg.message}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 flex gap-2 items-center">
                <textarea
                    className="flex-1 p-2 rounded bg-gray-800 text-white resize-none focus:outline-none"
                    rows={2}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <button
                    onClick={handleSend}
                    disabled={sending}
                    className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded text-white font-semibold"
                >
                    Send
                </button>
            </div>
        </div>
    );
}