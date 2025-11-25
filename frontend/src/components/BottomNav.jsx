import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, MessageCircle, Smile } from "lucide-react";
import { getUser } from "../services/userService";
import { toast } from "sonner";

// Move NavItem outside the component
const NavItem = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center w-16 gap-1 text-gray-500 hover:text-gray-300 transition-colors duration-200"
    >
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default function BottomNav() {
    const navigate = useNavigate();
    const [feeling, setFeeling] = useState("content"); // default

    useEffect(() => {
        async function fetchFeeling() {
            try {
                const user = await getUser();
                if (user?.feeling) setFeeling(user.feeling);
            } catch (err) {
                toast.error(err.message || "Failed to fetch user feeling");
            }
        }
        fetchFeeling();
    }, []);

    const getMoodIcon = () => {
        switch (feeling?.toLowerCase()) {
            case "happy": return "😊";
            case "content": return "😌";
            case "calm": return "🧘";
            case "neutral": return "😐";
            case "anxious": return "😰";
            case "sad": return "😢";
            case "excited": return "🤩";
            case "overwhelmed": return "😵‍💫";
            default: return null;
        }
    };

    const MoodIcon = getMoodIcon();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#120F22]/90 backdrop-blur-lg border-t border-white/5 z-40 pb-safe">
            <div className="flex justify-around items-center px-2 py-3">
                <NavItem icon={<Users size={24} />} label="Friends" onClick={() => navigate("/friends")} />
                <NavItem icon={<UserPlus size={24} />} label="Requests" onClick={() => navigate("/requests")} />

                {/* Central Mood Button */}
                <div className="relative -top-5">
                    <button
                        onClick={() => navigate("/mood")}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 border-4 border-[#120F22] active:scale-95 transition-transform"
                    >
                        {MoodIcon || <Smile size={30} />}
                    </button>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        My Mood
                    </span>
                </div>

                <NavItem icon={<MessageCircle size={24} />} label="Chats" onClick={() => navigate("/chat")} />
                <NavItem icon={<Users size={24} />} label="Add Friends" onClick={() => navigate("/add-friends")} />
            </div>
        </nav>
    );
}