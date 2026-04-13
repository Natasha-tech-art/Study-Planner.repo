import React, { useState, useEffect } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('study-tasks')) || []);
  const [subjects, setSubjects] = useState(() => JSON.parse(localStorage.getItem('study-subjects')) || ['Math', 'Science', 'English']);
  const [taskInput, setTaskInput] = useState({ title: '', subject: 'Math', deadline: '' });
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    localStorage.setItem('study-tasks', JSON.stringify(tasks));
    localStorage.setItem('study-subjects', JSON.stringify(subjects));
  }, [tasks, subjects]);

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.title.trim() || !taskInput.deadline) return;
    setTasks([...tasks, { id: Date.now(), ...taskInput, completed: false }]);
    setTaskInput({ ...taskInput, title: '', deadline: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      {/* Subject Creator */}
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
        <h3 className="text-white/40 uppercase font-black text-xs mb-4">1. Add Subject</h3>
        <form onSubmit={addSubject} className="flex gap-4">
          <input className="flex-grow bg-white/5 p-4 rounded-xl text-white outline-none border border-white/10"
            placeholder="New Subject..." value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
          <button type="submit" className="bg-purple-600 px-6 rounded-xl font-bold text-white">Add</button>
        </form>
      </div>

      {/* Task Creator */}
      <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
        <h2 className="text-4xl font-black italic text-white mb-8 uppercase">Manage Tasks</h2>
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="bg-white/5 p-4 rounded-xl text-white outline-none border border-white/10"
            placeholder="Task..." value={taskInput.title} onChange={(e) => setTaskInput({...taskInput, title: e.target.value})} />
          <select className="bg-slate-900 p-4 rounded-xl text-white border border-white/10"
            value={taskInput.subject} onChange={(e) => setTaskInput({...taskInput, subject: e.target.value})}>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="date" className="bg-white/5 p-4 rounded-xl text-white outline-none border border-white/10 invert"
            value={taskInput.deadline} onChange={(e) => setTaskInput({...taskInput, deadline: e.target.value})} />
          <button type="submit" className="bg-blue-600 rounded-xl font-bold text-white uppercase italic">Add Task +</button>
        </form>

        <div className="mt-10 space-y-4">
          {tasks.map(t => (
            <div key={t.id} className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/10 group">
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={t.completed} onChange={() => setTasks(tasks.map(item => item.id === t.id ? {...item, completed: !item.completed} : item))} className="w-6 h-6 rounded-full cursor-pointer" />
                <div>
                  <p className={`text-xl font-bold ${t.completed ? 'line-through text-white/20' : 'text-white'}`}>{t.title}</p>
                  <span className="text-[10px] font-black uppercase text-blue-400">{t.subject} — Due: {t.deadline}</span>
                </div>
              </div>
              <button onClick={() => setTasks(tasks.filter(item => item.id !== t.id))} className="text-red-500 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;