import React, { useState, useEffect } from 'react';

const Focus = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('study-tasks')) || [];
    setTasks(savedTasks);
    
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
      alert("Time's up! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="animate-in zoom-in duration-500 max-w-2xl mx-auto text-center">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-12 rounded-[3rem] shadow-2xl">
        <h2 className="text-white text-lg font-medium opacity-60 mb-2 uppercase tracking-widest">Focus Session</h2>
        
        <div className="text-8xl font-black text-white mb-8 tabular-nums tracking-tighter">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <select 
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-8 outline-none"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          <option value="" className="bg-slate-900">What are you focusing on?</option>
          {tasks.map(t => (
            <option key={t.id} value={t.title} className="bg-slate-900">{t.title}</option>
          ))}
        </select>

        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`px-10 py-4 rounded-2xl font-bold transition-all ${isActive ? 'bg-red-500/80 hover:bg-red-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}
          >
            {isActive ? 'Pause' : 'Continue'}
          </button>
          <button 
            onClick={resetTimer}
            className="px-10 py-4 rounded-2xl font-bold bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Focus;