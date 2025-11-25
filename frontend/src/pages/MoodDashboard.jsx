export default function MoodDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mood Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-xl">
          Total Users
          <p className="text-3xl font-bold mt-2">120</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-xl">
          Active Chats
          <p className="text-3xl font-bold mt-2">34</p>
        </div>
      </div>
    </div>
  );
}
