import React, { useState, useEffect } from 'react';

const Tasks = () => {
  // Pulling both Tasks and Subjects from Local Storage immediately
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('study-tasks')) || []);
  const [subjects, setSubjects] = useState(() => JSON.parse(localStorage.getItem('study-subjects')) || ['Math', 'Science', 'English']);
  
  const [taskInput, setTaskInput] = useState({ title: '', subject: 'Math' });
  const [newSubject, setNewSubject] = useState('');

  // Save to Local Storage whenever tasks or subjects change
  useEffect(() => {
    localStorage.setItem('study-tasks', JSON.stringify(tasks));
    localStorage.setItem('study-subjects', JSON.stringify(subjects));
  }, [tasks, subjects]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.title.trim()) return;
    const newTask = { id: Date.now(), ...taskInput, completed: false };
    setTasks([...tasks, newTask]);
    setTaskInput({ ...taskInput, title: '' });
  };

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* ADD SUBJECT SECTION */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
        <h3 className="text-white font-bold mb-4 uppercase tracking-tighter">1. Create a Subject</h3>
        <form onSubmit={addSubject} className="flex gap-4">
          <input 
            className="flex-grow bg-black/20 border border-white/10 p-4 rounded-xl text-white outline-none"
            placeholder="New subject name..."
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 px-6 rounded-xl font-bold text-white hover:bg-purple-500">Add</button>
        </form>
      </div>

      {/* ADD TASK SECTION */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
        <h3 className="text-white font-bold mb-4 uppercase tracking-tighter">2. Add Task to Subject</h3>
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            className="md:col-span-1 bg-black/20 border border-white/10 p-4 rounded-xl text-white outline-none"
            placeholder="Task title..."
            value={taskInput.title}
            onChange={(e) => setTaskInput({...taskInput, title: e.target.value})}
          />
          <select 
            className="bg-slate-900 border border-white/10 p-4 rounded-xl text-white font-bold"
            value={taskInput.subject}
            onChange={(e) => setTaskInput({...taskInput, subject: e.target.value})}
          >
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 px-6 rounded-xl font-bold text-white hover:bg-blue-500">Create Task</button>
        </form>
      </div>

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.map(t => (
          <div key={t.id} className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <input type="checkbox" checked={t.completed} onChange={() => {
                const updated = tasks.map(item => item.id === t.id ? {...item, completed: !item.completed} : item);
                setTasks(updated);
              }} className="w-6 h-6 rounded-full cursor-pointer" />
              <div>
                <p className={`text-xl font-bold ${t.completed ? 'line-through text-white/20' : 'text-white'}`}>{t.title}</p>
                <span className="text-xs font-black uppercase text-blue-4