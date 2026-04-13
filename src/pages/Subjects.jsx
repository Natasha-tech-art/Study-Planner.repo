import React, { useState, useEffect } from 'react';

const Subjects = () => {
  // 1. Load subjects from the shared Local Storage key
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('study-subjects');
    return saved ? JSON.parse(saved) : ['Math', 'Science', 'English', 'History'];
  });

  const [newSubject, setNewSubject] = useState('');

  // 2. Save to Local Storage whenever a subject is added or removed
  useEffect(() => {
    localStorage.setItem('study-subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const deleteSubject = (subjectName) => {
    // Prevent deleting everything so the app doesn't break
    if (subjects.length <= 1) {
      alert("You must have at least one subject!");
      return;
    }
    setSubjects(subjects.filter(s => s !== subjectName));
  };

  return (
    <div className="max-w-4xl mx-auto p-10 animate-in fade-in duration-700">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-12 shadow-2xl">
        <h2 className="text-5xl font-black italic uppercase text-white mb-10 tracking-tighter">Your Subjects</h2>
        
        {/* Input Section */}
        <form onSubmit={addSubject} className="flex gap-4 mb-12">
          <input 
            className="flex-grow bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-purple-500 transition-all"
            placeholder="Enter subject name (e.g. Physics)..."
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 text-white font-black px-10 rounded-2xl hover:bg-purple-500 transition-all uppercase italic">
            Add
          </button>
        </form>

        {/* Subjects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((sub) => (
            <div key={sub} className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl group hover:bg-white/10 transition-all">
              <span className="text-xl font-bold text-white tracking-tight">{sub}</span>
              <button 
                onClick={() => deleteSubject(sub)}
                className="text-red-500/40 hover:text-red-500 font-black text-xs uppercase opacity-0 group-hover:opacity-100 transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;