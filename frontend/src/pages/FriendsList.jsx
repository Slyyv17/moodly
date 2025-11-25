// FriendListItem.jsx
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const getMoodStyle = (mood) => {
  switch (mood) {
    case "happy":
    case "excited":
      return "text-yellow-400";
    case "calm":
    case "content":
      return "text-green-400";
    case "sad":
    case "anxious":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const MessageCircle = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);

export default function FriendListItem({ friend }) {
  const navigate = useNavigate();
  if (!friend || !friend.username || !friend._id) return null; // fail-safe

  const initials = getInitials(friend.username);
  const moodStyle = getMoodStyle(friend.feeling || "neutral");

  const goToChat = () => {
    navigate(
      `/chat?receiverId=${friend._id}&username=${encodeURIComponent(
        friend.username
      )}`
    );
  };

  return (
    <div className="flex items-center justify-between p-3.5 border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold text-lg">
          {initials}
        </div>
        <div>
          <p className="text-white text-lg font-semibold">{friend.username}</p>
          <p className={`text-sm capitalize ${moodStyle}`}>
            {friend.feeling || "neutral"}
          </p>
        </div>
      </div>
      <div
        className="p-2 rounded-full text-white/70 hover:text-sky-400 transition-colors cursor-pointer"
        onClick={goToChat}
      >
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  );
}