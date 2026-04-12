import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import CalendarView from './pages/CalendarView';
import Focus from './pages/Focus';
import Authentication from './pages/Authentication';

const Footer = () => (
  <footer className="w-full mt-auto">
    <div className="bg-white/5 backdrop-blur-2xl border-t border-white/10 p-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h3 className="text-white font-black text-4xl tracking-tighter uppercase italic">StudyScanner</h3>
        <p className="text-white/40 text-lg mt-2 font-medium">Master your productivity.</p>
      </div>
      <div className="flex gap-12 text-white/60 text-lg font-bold uppercase tracking-widest">
        <Link to="/" className="hover:text-blue-400">Privacy</Link>
        <Link to="/" className="hover:text-blue-400">Terms</Link>
        <Link to="/" className="hover:text-blue-400">Contact</Link>
      </div>
      <p className="text-white/20 text-sm font-bold uppercase tracking-tighter">© 2026 StudyScanner</p>
    </div>
  </footer>
);

// 2. DASHBOARD COMPONENT
const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, percent: 0 });
  const [reminder, setReminder] = useState("Welcome back!");
  const [streak, setStreak] = useState(0);

  const loadData = () => {
    const saved = JSON.parse(localStorage.getItem('study-tasks')) || [];
    const done = saved.filter(t => t.completed).length;
    const pct = saved.length > 0 ? Math.round((done / saved.length) * 100) : 0;

    setStats({ total: saved.length, completed: done, percent: pct });
    setStreak(saved.length > 0 ? 5 : 0);

    if (saved.length === 0) {
      setReminder("Your list is empty. Add a task to start!");
    } else if (pct < 100) {
      setReminder(`Keep going! ${saved.length - done} tasks left today.`);
    } else {
      setReminder("All tasks completed! You're crushing it. 🎉");
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('focus', loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener('focus', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-16 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div>
          <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none">Dashboard</h2>
          <p className="text-blue-400 font-black text-2xl mt-6">● {reminder}</p>
        </div>
        <div className="bg-orange-500/20 border-2 border-orange-500/50 px-10 py-5 rounded-3xl flex items-center gap-5">
          <span className="text-5xl">🔥</span>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-orange-400">{streak} DAY</span>
            <span className="text-xs font-black text-orange-200/50 uppercase tracking-widest">Streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-12 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Completion Progress</p>
          <p className="text-8xl font-black text-white">{stats.percent}%</p>
        </div>
        <div className="p-12 bg-white/5 rounded-[2.5rem] border border-white/10 text-center">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Tasks Completed</p>
          <p className="text-8xl font-black text-green-400">{stats.completed} <span className="text-white/20 text-4xl">/ {stats.total}</span></p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-fixed bg-cover bg-center" 
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')` }}>
        
        <div className="flex-grow flex flex-col bg-black/60 backdrop-blur-[2px]">
          
          <nav className="w-full bg-white/5 backdrop-blur-2xl border-b border-white/10 px-16 py-12 flex justify-between items-center z-50">
            <h1 className="text-white font-black text-5xl tracking-tighter uppercase italic">StudyScanner</h1>
            <div className="flex gap-16 text-white font-black text-xl uppercase tracking-widest">
              <Link to="/" className="hover:text-blue-400">Dashboard</Link>
              <Link to="/subjects" className="hover:text-blue-400">Subjects</Link>
              <Link to="/tasks" className="hover:text-blue-400">Tasks</Link>
              <Link to="/calendar" className="hover:text-blue-400">Calendar</Link>
              <Link to="/focus" className="hover:text-blue-400">Focus</Link>
              <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
            </div>
          </nav>

          <main className="flex-grow p-12 md:p-24 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/focus" element={<Focus />} />
                <Route path="/signup" element={<Authentication isSignUpInitial={true} />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}
