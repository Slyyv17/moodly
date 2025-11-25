import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { toast } from 'sonner';

export default function EmpathyBuddyLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginUser({ email, password });
      const { token } = res.data;
      toast.success('Login successful. Redirecting.');
      localStorage.setItem('token', token);
      setTimeout(() => navigate('/mood'), 1000);
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f1e] flex flex-col items-center justify-between p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center justify-center flex-grow relative z-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-16 animate-slide-down">
          <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 animate-bounce-slow">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Empathy Buddy</h1>
        </div>

        <div className="w-full space-y-6">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-400 text-lg">Log in to continue your conversations.</p>
          </div>

          <div className="space-y-5">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e1e3a] border-2 border-[#4F46E5]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all hover:border-[#4F46E5]/50 focus:scale-105"
                placeholder="Enter your email"
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a4e] border border-[#3a3a5e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all hover:border-[#4F46E5]/50 focus:scale-105"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#2a2a4e]" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-[#4F46E5] hover:text-[#6366F1] transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={handleLogin}
                disabled={isSubmitting}
                className="w-full bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
          </div>

          <div className="text-center pt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/register" className="text-[#4F46E5] hover:text-[#6366F1] font-semibold transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8 relative z-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="text-gray-500 text-sm">Join 10,000+ people finding support</p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
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
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}