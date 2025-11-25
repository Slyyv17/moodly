import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import MoodSelect from "./pages/MoodSelect";
import FriendsList from "./pages/FriendsList";
import FriendRequests from "./pages/FriendRequest";
import Home from "./pages/Home";
import MoodDashboard from "./pages/MoodDashboard";
import Login from "./pages/Login";
import AddFriends from "./pages/AddFriends";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without BottomNav */}
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mood" element={<MoodSelect />} />

        {/* Pages with BottomNav */}
        <Route
          element={<Layout />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<MoodDashboard />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/requests" element={<FriendRequests />} />
          <Route path="/add-friends" element={<AddFriends />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;