import React, { useState, useEffect } from 'react';

const Focus = () => {
  const [focusText, setFocusText] = useState("");
  
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
      alert("Time is up! Great focus.");
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  return (
    <div className="max-w-4xl mx-auto text-white mt-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
        <h2 className="text-4xl font-black mb-8 text-center uppercase tracking-tighter">Focus Mode</h2>

        <div className="mb-10">
          <label className="block text-sm font-bold text-white/40 uppercase mb-3">What are you working on?</label>
          <input 
            type="text"
            placeholder="e.g., Coding React Components"
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={focusText}
            onChange={(e) => setFocusText(e.target.value)} 
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              value={minutes} 
              onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
              disabled={isActive}
              className="w-32 bg-white/5 border border-white/10 text-6xl font-black text-center p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-6xl font-black">:</span>
            <div className="text-6xl font-black w-32 bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
              {seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>

          <div className="flex gap-4 w-full max-w-sm mt-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`flex-grow py-5 rounded-2xl font-black uppercase text-xl transition-all transform hover:scale-105 shadow-xl ${isActive ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'}`}
            >
              {isActive ? 'Stop' : 'Start'}
            </button>
            <button 
              onClick={() => { setIsActive(false); setMinutes(25); setSeconds(0); }}
              className="px-8 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {focusText && (
          <p className="mt-10 text-center text-white/60 italic text-xl">
            Currently focusing on: <span className="text-blue-400 font-bold">"{focusText}"</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Focus;