import React, { useState, useEffect } from "react";
import { GetAllUsers } from "../services/userService";
import FriendButton from "../components/FriendBtn";
import { toast } from "sonner";

export default function AddFriends() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const allUsers = await GetAllUsers();
                setUsers(Array.isArray(allUsers) ? allUsers : []);
            } catch (err) {
                toast.error(err.message || "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <p className="text-center mt-10 text-white">
                Loading users...
            </p>
        );
    }

    return (
        <main className="p-6 min-h-screen bg-[#120F22] text-white">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-md">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Feeling
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                                        {user.username}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-indigo-400">
                                        {user.feeling}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <FriendButton targetId={user._id} />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}