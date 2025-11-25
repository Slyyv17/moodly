import React from 'react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f1e] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
      </div>

      <div className="flex-1 flex flex-col justify-end p-8 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12 animate-slide-down">
            <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 animate-bounce-slow">
              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
                <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="text-center animate-slide-up">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
              Connect with Someone Who Understands.
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Chat with AI-matched buddies based on your mood.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="/register"
              className="w-full rounded-full bg-[#4F46E5] px-4 py-4 text-center text-base font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-[#4338CA] transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Start Your Journey
            </a>
            
            <a
              href="/login"
              className="w-full rounded-full border-2 border-[#4F46E5]/50 bg-transparent px-4 py-4 text-center text-base font-semibold text-white hover:bg-[#4F46E5]/10 hover:border-[#4F46E5] transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Log In
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Join 10,000+ people finding support
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}