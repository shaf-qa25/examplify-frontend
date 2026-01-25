import React from 'react';
import { motion } from 'framer-motion';

const LearningCentre = () => {
  const playlists = [
    { 
      title: "Computer Organization (COA)", 
      channel: "Education 4u", 
      link: "https://youtube.com/playlist?list=PLrjkTql3jnm9vstxJ6fU8M85-Y0p_9f-p", 
      color: "#E3F2FD" // Light Blue
    },
    { 
      title: "Mathematics-IV", 
      channel: "Gajendra Purohit", 
      link: "https://www.youtube.com/@GP_Sir", 
      color: "#F3E5F5" // Light Purple
    },
    { 
      title: "Python Programming", 
      channel: "CodeWithHarry", 
      link: "https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME", 
      color: "#FFF9C4" // Light Yellow (Python vibes)
    },
    { 
      title: "DSTL (Discrete Structures)", 
      channel: "Gate Smashers", 
      link: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEEd7HPasS724sS9p67S6T3", 
      color: "#FFECB3" // Light Amber
    }
  ];

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 font-exo">Learning Centre</h1>
        <p className="text-gray-500 mt-2">Recommended Video Lectures for your Semester.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {playlists.map((pl, i) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={i} 
            className="p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
            style={{ backgroundColor: pl.color }}
            onClick={() => window.open(pl.link, "_blank")}
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{pl.title}</h3>
              <p className="text-gray-700 mt-1 font-medium italic">{pl.channel}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-red-600">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
                  className="h-4" 
                  alt="yt" 
                />
                Watch Playlist
              </div>
            </div>
            <div className="bg-white/40 p-4 rounded-2xl ml-4">
              <img 
                src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/learning_xgewgp.png" 
                className="h-12" 
                alt="play icon" 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningCentre;