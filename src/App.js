import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Subjects from './pages/Subjects';
import CalendarView from './pages/CalendarView';
import Focus from './pages/Focus';
import Authentication from './pages/Authentication';



const Dashboard = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white shadow-2xl">
    <h2 className="text-3xl font-bold mb-4">Study Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-sm text-white/60 uppercase">Current Streak</p>
        <p className="text-2xl font-bold text-orange-400"> 🔥</p>
      </div>
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-sm text-white/60 uppercase">Completion</p>
        <p className="text-2xl font-bold text-green-400">85%</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-fixed bg-cover bg-center" 
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564')` }}>
        
        <div className="min-h-screen bg-black/30 backdrop-blur-sm p-4 md:p-10">
          
  
<nav className="max-w-5xl mx-auto mb-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-8 py-4 flex justify-between items-center shadow-2xl">
  <h1 className="text-white font-black text-2xl tracking-tighter">STUDYSCANNER</h1>
  <div className="flex gap-8 text-white/90 font-medium">
    <Link to="/" className="hover:text-blue-300 transition">Dashboard</Link>
    <Link to="/subjects" className="hover:text-blue-300 transition">Subjects</Link>
    <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
    <Link to="/calendar" className="hover:text-blue-300 transition">Calendar</Link>
    <Link to="/focus" className="hover:text-blue-300 transition">Focus</Link>
    <Link to="/auth" className="hover:text-blue-300 transition">Authentication</Link>
  </div>
</nav>

<main className="max-w-5xl mx-auto">
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/subjects" element={<Subjects />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/calendar" element={<CalendarView />} />
    <Route path="/focus" element={<Focus />} />
    <Route path="/auth" element={<Authentication />} />
  </Routes>
</main>

        </div>
      </div>
    </Router>
  );
}

export default App;