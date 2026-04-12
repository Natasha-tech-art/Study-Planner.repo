import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', desc: '', deadline: '', subject: 'General' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('study-tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('study-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.title) return;
    const newTask = { ...taskInput, id: Date.now(), completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput({ title: '', desc: '', deadline: '', subject: 'General' });
  };

  const getPriority = (date) => {
    const diff = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff <= 2) return 'bg-red-500/60 border-red-400';
    if (diff <= 5) return 'bg-orange-500/60 border-orange-400';
    return 'bg-green-500/60 border-green-400';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Task Input Form */}
      <form onSubmit={addTask} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          type="text" placeholder="Task Title" 
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/40 outline-none focus:border-blue-400"
          value={taskInput.title} onChange={(e) => setTaskInput({...taskInput, title: e.target.value})}
        />
        <input 
          type="date" 
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-400"
          value={taskInput.deadline} onChange={(e) => setTaskInput({...taskInput, deadline: e.target.value})}
        />
        <select 
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none"
          value={taskInput.subject} onChange={(e) => setTaskInput({...taskInput, subject: e.target.value})}
        >
          <option className="bg-slate-800">General</option>
          <option className="bg-slate-800">Math</option>
          <option className="bg-slate-800">Science</option>
        </select>
        <button type="submit" className="bg-blue-500/80 hover:bg-blue-400 text-white font-bold rounded-xl p-3 transition-all">Add Task +</button>
      </form>

      {/* Task List Rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => (
          <div key={task.id} className={`p-6 rounded-2xl border backdrop-blur-lg shadow-xl transition-all hover:scale-[1.02] ${getPriority(task.deadline)}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{task.title}</h3>
                <p className="text-white/70 text-sm italic">{task.subject}</p>
              </div>
              <button 
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                className="text-white/40 hover:text-white"
              >✕</button>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="text-xs font-mono text-white/80">Due: {task.deadline || 'No date'}</span>
              <button className="bg-white/20 hover:bg-white/40 px-4 py-1 rounded-full text-xs text-white">Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;