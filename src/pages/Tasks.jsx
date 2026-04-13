import React, { useState, useEffect } from 'react';

const Tasks = () => {
  // 1. Initial State: Pull from Local Storage so data persists on refresh
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('study-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('study-subjects');
    return saved ? JSON.parse(saved) : ['General', 'Math', 'Science', 'English'];
  });

  const [taskInput, setTaskInput] = useState({ title: '', subject: 'General' });
  const [newSubject, setNewSubject] = useState('');

  // 2. Persistence: Save to Local Storage automatically
  useEffect(() => {
    localStorage.setItem('study-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('study-subjects', JSON.stringify(subjects));
  }, [subjects]);

  // 3. Logic: Add Subject, Add Task, Toggle, and Delete
  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput.title,
      subject: taskInput.subject,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput({ ...taskInput, title: '' });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-10 animate-in fade-in duration-700">
      
      {/* ADD NEW SUBJECT */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
        <h3 className="text-white/40 uppercase font-black tracking-widest text-xs mb-4">Step 1: Create a Subject</h3>
        <form onSubmit={handleAddSubject} className="flex gap-4">
          <input 
            className="flex-grow bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-purple-500 transition-all"
            placeholder="e.g., Computer Science..."
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 px-8 rounded-2xl font-bold text-white hover:bg-purple-500 transition-all">Add</button>
        </form>
      </div>

      {/* TASK MANAGER */}
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-8 md:p-16 shadow-2xl">
        <h2 className="text-5xl font-black italic uppercase text-white mb-10 tracking-tighter">Manage Tasks</h2>
        
        <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <input 
            className="md:col-span-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500"
            placeholder="New task..."
            value={taskInput.title}
            onChange={(e) => setTaskInput({...taskInput, title: e.target.value})}
          />
          <select 
            className="bg-slate-900 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none"
            value={taskInput.subject}
            onChange={(e) => setTaskInput({...taskInput, subject: e.target.value})}
          >
            {subjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all uppercase italic">
            Add Task +
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-white/20 text-center py-10 font-bold uppercase italic">Your list is currently empty</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all group">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-white/20'}`}
                  >
                    {task.completed && <span className="text-white">✓</span>}
                  </button>
                  <div>
                    <h3 className={`text-xl font-bold ${task.completed ? 'line-through text-white/20' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                      {task.subject}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-red-500/30 hover:text-red-500 font-black text-xs uppercase opacity-0 group-hover:opacity-100 transition-all">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;