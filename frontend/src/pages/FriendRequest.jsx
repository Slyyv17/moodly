import { useEffect, useState } from "react";
import { GetPendingRequest } from "../services/friendService";
import { toast } from "sonner";
import FriendButton from "../components/FriendBtn";

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(diff / 604800);
  const months = Math.floor(diff / 2628000);
  const years = Math.floor(diff / 31536000);

  if (diff < 60) return "just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await GetPendingRequest();
        setRequests(data.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load friend requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <p className="p-6">Loading requests...</p>;
  }

  if (requests.length === 0) {
    return <p className="p-6">No pending friend requests.</p>;
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-800 bg-gray-900 rounded-lg">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="p-4 border-b border-gray-700">User</th>
              <th className="p-4 border-b border-gray-700">Date</th>
              <th className="p-4 border-b border-gray-700 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-800">
                <td className="p-4 border-b border-gray-700">
                  {req.sender?.username || "Unknown User"}
                </td>
                <td className="p-4 border-b border-gray-700">
                  {timeAgo(req.createdAt)}
                </td>
                <td className="p-4 border-b border-gray-700">
                  <div className="flex gap-3 justify-center">
                    <FriendButton
                      targetId={req.sender?._id}
                      isIncoming={true}
                      onAction={() => {
                        // Remove from table after accept/reject
                        setRequests((prev) => prev.filter((r) => r._id !== req._id));
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}