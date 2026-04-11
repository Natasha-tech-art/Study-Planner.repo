import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
// Import other pages...

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564')] bg-cover bg-fixed font-sans">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 flex justify-between items-center">
            <h1 className="text-white font-bold text-xl tracking-tight">StudyScanner</h1>
            <div className="space-x-6 text-white/80 text-sm font-medium">
              <Link to="/" className="hover:text-white transition">Dashboard</Link>
              <Link to="/tasks" className="hover:text-white transition">Tasks</Link>
              <Link to="/subjects" className="hover:text-white transition">Subjects</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-28 pb-10 px-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;