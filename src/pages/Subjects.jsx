import React, { useState, useEffect } from 'react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('study-subjects')) || ['General', 'Math', 'Science'];
    setSubjects(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('study-subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubject || subjects.includes(newSubject)) return;
    setSubjects([...subjects, newSubject]);
    setNewSubject('');
  };

  const deleteSubject = (sub) => {
    if (sub === 'General') return; 
    setSubjects(subjects.filter(s => s !== sub));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Your Subjects</h2>
        
        <form onSubmit={addSubject} className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Enter new subject..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-400"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white px-8 rounded-xl font-bold transition-all">
            Add
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(sub => (
            <div key={sub} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all group">
              <span className="text-white font-medium">{sub}</span>
              {sub !== 'General' && (
                <button 
                  onClick={() => deleteSubject(sub)}
                  className="text-white/20 group-hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;