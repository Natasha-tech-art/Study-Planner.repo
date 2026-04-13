import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [taskStats, setTaskStats] = React.useState({ total: 0, completed: 0, percent: 0 });
  const [reminder, setReminder] = React.useState("Welcome back!");
  const [streak, setStreak] = React.useState(0);

  const loadData = () => {
    const savedTasks = JSON.parse(localStorage.getItem('study-tasks')) || [];
    const completedCount = savedTasks.filter(t => t.completed).length;
    const percentage = savedTasks.length > 0 ? Math.round((completedCount / savedTasks.length) * 100) : 0;

    setTaskStats({
      total: savedTasks.length,
      completed: completedCount,
      percent: percentage
    });

    React.useEffect(() => {
  const loadData = () => {
    const savedTasks = JSON.parse(localStorage.getItem('study-tasks')) || [];
    const completedCount = savedTasks.filter(t => t.completed).length;
    const percentage = savedTasks.length > 0 ? Math.round((completedCount / savedTasks.length) * 100) : 0;

    setTaskStats({
      total: savedTasks.length,
      completed: completedCount,
      percent: percentage
    });
    
  };

  loadData();
  window.addEventListener('focus', loadData);
  return () => window.removeEventListener('focus', loadData);
}, []);

    if (savedTasks.length === 0) {
      setReminder("Your list is empty. Add tasks to start your streak!");
    } else if (percentage < 100) {
      setReminder(`Push through! ${savedTasks.length - completedCount} tasks left.`);
    } else {
      setReminder("All caught up! You're a productivity master.");
    }
    
const today = new Date().toISOString().split('T')[0];

const todaysTasks = savedTasks.filter(t => t.deadline === today);
const allDoneToday = todaysTasks.length > 0 && todaysTasks.every(t => t.completed);

setStreak(allDoneToday ? 1 : 0);

  React.useEffect(() => {
    loadData(); 

    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);


  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 text-white shadow-2xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Study Dashboard</h2>
          <p className="text-blue-400 font-bold mt-2 flex items-center gap-2">
            <span className="animate-pulse">●</span> {reminder}
          </p>
        </div>
        <div className="bg-orange-500/20 border border-orange-500/40 px-6 py-3 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-xl font-black text-orange-400">{streak} DAY STREAK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition">
          <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Total Progress</p>
          <p className="text-5xl font-black text-white mt-2">{taskStats.percent}%</p>
          <div className="w-full bg-white/10 h-3 rounded-full mt-4 overflow-hidden">
             <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${taskStats.percent}%` }}></div>
          </div>
        </div>
        
        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition">
          <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Tasks Completed</p>
          <p className="text-5xl font-black text-green-400 mt-2">{taskStats.completed}<span className="text-white/20 text-2xl"> / {taskStats.total}</span></p>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;