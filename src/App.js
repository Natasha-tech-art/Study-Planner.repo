import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './pages/Tasks';


const Dashboard = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white shadow-2xl">
    <h2 className="text-3xl font-bold mb-4">Study Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-sm text-white/60 uppercase">Current Streak</p>
        <p className="text-2xl font-bold text-orange-400">12 Days 🔥</p>
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
      {/* Background Container - Make sure this URL works! */}
      <div className="min-h-screen bg-fixed bg-cover bg-center" 
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564')` }}>
        
        <div className="min-h-screen bg-black/30 backdrop-blur-sm p-4 md:p-10">
          
          {/* Glass Navbar */}
          <nav className="max-w-5xl mx-auto mb-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-8 py-4 flex justify-between items-center shadow-2xl">
            <h1 className="text-white font-black text-2xl">STUDY<span className="text-blue-400">SCANNER</span></h1>
            <div className="flex gap-8 text-white/90 font-medium">
              <Link to="/" className="hover:text-blue-300 transition">Dashboard</Link>
              <Link to="/tasks" className="hover:text-blue-300 transition">Tasks</Link>
            </div>
          </nav>

          <main className="max-w-5xl mx-auto">
  <Routes>
    {/* This connects to the Dashboard component you created */}
    <Route path="/" element={<Dashboard />} />
    
    {/* CHANGE THIS LINE: Use the actual Tasks component here */}
    <Route path="/tasks" element={<Tasks />} />
  </Routes>
</main>

        </div>
      </div>
    </Router>
  );
}

export default App;