import React, { useState, useEffect } from "react";
import Header from "../components/header";
import ChatList from "../components/ChatList";
import BottomNav from "../components/BottomNav";
import { getUser } from "../services/userService";
import { toast } from "sonner";

export default function HomePage() {
  const [currentMood, setCurrentMood] = useState("content");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUser();
        setUser(userData);
        if (userData?.feeling) setCurrentMood(userData.feeling);
      } catch (err) {
        toast.error(err.message || "Failed to fetch user data");
      }
    }
    fetchUserData();
  }, []);

  const activeChats = [
    { id: 1, name: "Sarah Jenkins", message: "I totally get that feeling...", time: "2m", avatar: null, unread: 2 },
    { id: 2, name: "David K.", message: "Thanks for listening.", time: "1h", avatar: null, unread: 0 },
    { id: 3, name: "Empathy Bot", message: "How is your mood shifting?", time: "1d", avatar: null, unread: 0 },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#120F22] text-white relative overflow-hidden pry-ff">
      <Header user={user} />

      <main className="flex-1 overflow-y-auto z-10 pb-24 pt-2 px-6">
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        <ChatList chats={activeChats} />
      </main>

      <BottomNav currentMood={currentMood} />
    </div>
  );
}
