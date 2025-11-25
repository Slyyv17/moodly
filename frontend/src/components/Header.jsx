import React, { useState, useEffect } from "react";
import { getUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getUser(); // now returns the actual user object
                setUser(userData);
            } catch (err) {
                toast.error(err.message || "Failed to fetch user");
            }
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-30 px-6 py-5 flex justify-between items-center bg-[#120F22]/80 backdrop-blur-md border-b border-white/5">
            <h1 className="text-2xl font-bold tracking-tight text-white">Chats</h1>

            <div className="relative">
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600/40 transition-colors"
                >
                    <User size={20} />
                </button>

                {showProfileMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowProfileMenu(false)}
                        ></div>
                        <div className="absolute right-0 top-12 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-3 border-b border-gray-800">
                                <p className="text-sm font-medium text-white">
                                    {user?.username || "User"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {user?.email || "email@example.com"}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/settings")}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-left"
                            >
                                <Settings size={16} /> Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-left"
                            >
                                <LogOut size={16} /> Log Out
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}