import React from 'react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Streak Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-white/60 uppercase tracking-widest text-xs font-bold mb-2">Current Streak</h2>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black text-white">12</span>
          <span className="text-orange-400 font-bold pb-1">Days 🔥</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-white/60 uppercase tracking-widest text-xs font-bold mb-4">Daily Progress</h2>
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/10">
          <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full w-[75%] rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
        </div>
        <p className="text-white/80 mt-3 text-sm italic">"Almost there! 3 more tasks to hit your daily goal."</p>
      </div>

      {/* Quick Subject View */}
      <div className="md:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
         <h3 className="text-white font-semibold mb-4 text-lg">Upcoming Deadlines</h3>
         {/* We will map through tasks here later */}
         <div className="text-white/40 text-center py-10 border-2 border-dashed border-white/10 rounded-2xl">
            No urgent tasks today. Relax! 
         </div>
      </div>
    </div>
  );
};

export default Dashboard;