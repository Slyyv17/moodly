import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatList({ chats }) {
    const navigate = useNavigate();

    return (
        <div className="space-y-1">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    onClick={() => navigate(`/chat/${chat.id}`)}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer active:bg-white/10"
                >
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {chat.name.charAt(0)}
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#120F22]"></div>
                    </div>

                    {/* Message info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{chat.message}</p>
                    </div>

                    {/* Unread badge */}
                    {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                            {chat.unread}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}