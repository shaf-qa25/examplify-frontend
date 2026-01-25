import React from 'react';
import { motion } from 'framer-motion';

const Events = () => {
  const eventList = [
    {
      id: 1,
      title: "Townhall: Web Development",
      date: "25 Jan",
      time: "10:00 AM",
      desc: "BDCOE's signature workshop covering Frontend, Backend, and the latest in React/Next.js ecosystem.",
      type: "Workshop",
      color: "#2293F8"
    },
    {
      id: 2,
      title: "Townhall: Web Development",
      date: "25 Jan",
      time: "10:00 AM",
      desc: "BDCOE's signature workshop covering Frontend, Backend, and the latest in React/Next.js ecosystem.",
      type: "Workshop",
      color: "#2293F8"
    },
    {
      id: 3,
      title: "Townhall: Web Development",
      date: "25 Jan",
      time: "10:00 AM",
      desc: "BDCOE's signature workshop covering Frontend, Backend, and the latest in React/Next.js ecosystem.",
      type: "Workshop",
      color: "#2293F8"
    }
  ];

  return (
    <div className="p-8 bg-white min-h-screen font-exo">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Upcoming Events</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-[#F4F8FF]"
          >
            {/* Header with Date & Type */}
            <div className="h-32 bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] p-6 flex justify-between items-start text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                {event.type}
              </span>
              <div className="text-right">
                <h2 className="text-3xl font-bold leading-none">{event.date.split(' ')[0]}</h2>
                <p className="text-xs uppercase font-medium mt-1 opacity-90">{event.date.split(' ')[1]}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 min-h-[56px]">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {event.desc}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-[#2293F8] font-bold text-sm bg-blue-50 px-3 py-2 rounded-xl">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </div>
                <button className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-tighter">
                  Register →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;