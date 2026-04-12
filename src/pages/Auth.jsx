import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isSignUpInitial = false }) => {
  const [isSignUp, setIsSignUp] = useState(isSignUpInitial);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] animate-in fade-in zoom-in duration-500">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-black text-white mb-2">
          {isSignUp ? 'Join StudyScanner' : 'Welcome Back'}
        </h2>
        <p className="text-white/60 mb-8">
          {isSignUp ? 'Create an account to start tracking' : 'Login to resume your sessions'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-400" required />
          )}
          <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-400" required />
          <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-400" required />
          
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 text-white/40 hover:text-white transition-colors text-sm"
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;