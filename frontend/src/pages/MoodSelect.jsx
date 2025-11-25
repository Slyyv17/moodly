import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateFeeling } from '../services/userService';

const moodOptions = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'from-yellow-200 to-yellow-500' },
  { value: 'content', label: 'Content', emoji: '😌', color: 'from-green-200 to-green-500' },
  { value: 'calm', label: 'Calm', emoji: '🧘', color: 'from-teal-200 to-teal-500' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'from-gray-200 to-gray-400' },
  { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'from-purple-200 to-purple-500' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'from-blue-200 to-blue-500' },
  { value: 'excited', label: 'Excited', emoji: '🤩', color: 'from-orange-200 to-red-400' },
  { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😵‍💫', color: 'from-red-200 to-red-500' },
];

export default function MoodSelect() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedMood) return;
    setIsSubmitting(true);

    try {
      const updatedUser = await updateFeeling(selectedMood);
      console.log("Updated user:", updatedUser);
      navigate('/home'); // redirect after updating
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to update feeling');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#120F22] relative overflow-hidden text-white font-sans">
      {/* HEADER */}
      <header className="relative z-10 pt-8 px-6 pb-4 text-center">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Hello there</h1>
        <p className="text-gray-400 text-sm">How are you feeling at this moment?</p>
      </header>

      {/* MOOD GRID */}
      <main className="flex-1 overflow-y-auto px-6 pb-32 z-10 scrollbar-hide">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 justify-items-center max-w-md mx-auto">
          {moodOptions.map((mood) => {
            const isSelected = selectedMood === mood.value;
            return (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className="flex flex-col items-center group focus:outline-none transition-transform duration-200 active:scale-95"
              >
                <div className={`relative w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-2xl transition-all duration-300
                  bg-gradient-to-br ${mood.color} 
                  ${isSelected
                    ? 'ring-4 ring-indigo-500 ring-offset-4 ring-offset-[#120F22] scale-110 z-10 shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                    : 'opacity-90 hover:opacity-100 hover:scale-105 border-4 border-white/5'
                  }`}>
                  <span className="drop-shadow-lg filter">{mood.emoji}</span>
                </div>
                <span className={`mt-3 text-base font-medium transition-colors duration-300 ${isSelected ? 'text-indigo-400 font-bold' : 'text-gray-400'}`}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* BOTTOM ACTION BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#120F22]/80 backdrop-blur-xl z-20 border-t border-white/5">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedMood || isSubmitting}
            className={`w-full py-4 rounded-2xl text-white text-lg font-bold shadow-xl transition-all duration-300
              ${selectedMood
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? 'inspecting atmosphere' : 'Find a Connection'}
          </button>
          <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-wider">
            Your identity is always protected
          </p>
        </div>
      </div>
    </div>
  );
}