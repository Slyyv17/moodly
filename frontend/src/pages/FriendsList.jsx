import { useEffect, useState } from "react";
import { GetFriends } from "../services/FriendService";
import { Link } from "react-router-dom";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await GetFriends();
        console.log("FRIENDS FROM BACKEND:", res);
        setFriends(res.data.friends); // the array of friends
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    }
    fetchFriends();
  }, []);

  if (!Array.isArray(friends)) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">
              Username
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase">
              Mood
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium uppercase">
              Chat
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {friends.map((friend) => (
            <tr key={friend._id} className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 font-semibold text-white">
                {friend.username}
              </td>
              <td className="px-6 py-4 text-sm text-gray-400 capitalize">
                {friend.feeling || "neutral"}
              </td>
              <td className="px-6 py-4 text-center">
                <Link
                  to={`/chat?receiverId=${friend._id}&username=${encodeURIComponent(
                    friend.username
                  )}`}
                  className="p-2 rounded-full hover:bg-sky-500 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h4m1 8l-5-5H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-5 5z"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}