import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Subjects from './pages/Subjects';
import CalendarView from './pages/CalendarView';
import Focus from './pages/Focus';
import Authentication from './pages/Authentication';

// 1. THE FOOTER DEFINITION (Must be ABOVE the App function)
const Footer = () => (
  <footer className="w-full mt-auto"> 
    <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-10 flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h3 className="text-white font-black text-3xl tracking-tighter uppercase">StudyScanner</h3>
        <p className="text-white/50 text-lg mt-2">Master your productivity.</p>
      </div>
      <div className="flex gap-10 text-white/70 text-lg font-medium">
        <Link to="/privacy" className="hover:text-blue-400 transition">Privacy</Link>
        <Link to="/terms" className="hover:text-blue-400 transition">Terms</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
      </div>
      <p className="text-white/30 text-sm">© 2026 StudyScanner. All rights reserved.</p>
    </div>
  </footer>
);

// 2. THE DASHBOARD DEFINITION
const Dashboard = () => {
  const [taskStats, setTaskStats] = React.useState({ total: 0, completed: 0, percent: 0 });

  React.useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('study-tasks')) || [];
    const completedCount = savedTasks.filter(t => t.completed).length;
    setTaskStats({
      total: savedTasks.length,
      completed: completedCount,
      percent: savedTasks.length > 0 ? Math.round((completedCount / savedTasks.length) * 100) : 0
    });
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 text-white shadow-2xl">
      <h2 className="text-4xl font-black mb-8">Study Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-sm text-white/60 uppercase tracking-widest">Total Tasks</p>
          <p className="text-4xl font-black text-orange-400 mt-2">{taskStats.total}</p>
        </div>
        <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-sm text-white/60 uppercase tracking-widest">Completion</p>
          <p className="text-4xl font-black text-green-400 mt-2">{taskStats.percent}%</p>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <Link to="/signup">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-16 py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl uppercase tracking-tighter text-xl">
            Start Studying →
          </button>
        </Link>
      </div>
    </div>
  );
};

// 3. THE MAIN APP FUNCTION
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-fixed bg-cover bg-center" 
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')` }}>
        
        {/* Force everything inside a semi-transparent overlay that fills the screen */}
        <div className="flex-grow flex flex-col bg-black/40 backdrop-blur-[2px]">
          
          <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 px-10 py-8 flex justify-between items-center z-50">
            <h1 className="text-white font-black text-4xl tracking-tighter uppercase italic">StudyScanner</h1>
            <div className="flex gap-12 text-white font-bold text-xl uppercase tracking-tight">
              <Link to="/" className="hover:text-blue-400 transition">Dashboard</Link>
              <Link to="/subjects" className="hover:text-blue-400 transition">Subjects</Link>
              <Link to="/tasks" className="hover:text-blue-400 transition">Tasks</Link>
              <Link to="/calendar" className="hover:text-blue-400 transition">Calendar</Link>
              <Link to="/focus" className="hover:text-blue-400 transition">Focus</Link>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            </div>
          </nav>

          <main className="flex-grow flex items-center justify-center p-6 md:p-20">
            <div className="w-full max-w-6xl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/focus" element={<Focus />} />
                <Route path="/login" element={<Authentication isSignUpInitial={false} />} />
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

export default App;