import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css'; 

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('study-tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const hasTask = tasks.some(t => t.deadline === dateString);
      return hasTask ? <div className="h-2 w-2 bg-blue-400 rounded-full mx-auto mt-1"></div> : null;
    }
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Study Schedule</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* The Calendar Widget */}
          <div className="glass-calendar p-4 rounded-2xl bg-white/5 border border-white/10">
            <Calendar 
              onChange={setDate} 
              value={date} 
              tileContent={tileContent}
              className="bg-transparent border-none text-white"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-semibold text-blue-300">
              Tasks for {date.toDateString()}
            </h3>
            <div className="space-y-3">
              {tasks.filter(t => t.deadline === date.toISOString().split('T')[0]).length > 0 ? (
                tasks.filter(t => t.deadline === date.toISOString().split('T')[0]).map(t => (
                  <div key={t.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-white font-bold">{t.title}</p>
                    <p className="text-white/60 text-sm">{t.subject}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/40 italic">No tasks due this day.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;