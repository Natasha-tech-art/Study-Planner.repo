import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('study-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState({
    title: '',
    subject: 'General',
    deadline: ''
  });

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.title.trim()) return;

    const newTask = {
      ...taskInput,
      id: Date.now(),
      completed: false,
      date: new Date().toLocaleDateString()
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // CRITICAL: This key MUST match what the Dashboard looks for
    localStorage.setItem('study-tasks', JSON.stringify(updatedTasks));
    
    // Reset form
    setTaskInput({ title: '', subject: 'General', deadline: '' });
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    localStorage.setItem('study-tasks', JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('study-tasks', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-12 shadow-2xl">
        <h2 className="text-5xl font-black italic uppercase text-white mb-10 tracking-tighter">Manage Tasks</h2>

        {/* RESTORED FORM WITH SUBJECTS */}
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <input 
            type="text"
            placeholder="Task name..."
            className="md:col-span-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500"
            value={taskInput.title}
            onChange={(e) => setTaskInput({...taskInput, title: e.target.value})}
          />
          
          <select 
            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 appearance-none"
            value={taskInput.subject}
            onChange={(e) => setTaskInput({...taskInput, subject: e.target.value})}
          >
            <option className="bg-slate-900" value="General">General</option>
            <option className="bg-slate-900" value="Math">Math</option>
            <option className="bg-slate-900" value="Science">Science</option>
            <option className="bg-slate-900" value="English">English</option>
            <option className="bg-slate-900" value="History">History</option>
          </select>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all transform hover:scale-105 active:scale-95 uppercase italic">
            Add Task +
          </button>
        </form>

        {/* TASK LIST */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-3xl group">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${task.completed ? 'bg-green-500 border-green-500' : 'border-white/20'}`}
                >
                  {task.completed && "✓"}
                </button>
                <div>
                  <h3 className={`text-xl font-bold ${task.completed ? 'line-through text-white/20' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                    {task.subject}
                  </span>
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-red-500/50 hover:text-red-500 font-bold text-xs transition-opacity opacity-0 group-hover:opacity-100">
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;