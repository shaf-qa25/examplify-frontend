import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from local storage on mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('user_bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const removeBookmark = (id) => {
    const updated = bookmarks.filter(item => item.id !== id);
    setBookmarks(updated);
    localStorage.setItem('user_bookmarks', JSON.stringify(updated));
  };

  const colors = ["#FFB6B9", "#A0C4FF", "#B5EAD7", "#C7CEEA"];

  return (
    <div className="p-8 min-h-screen bg-white">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 font-exo">My Bookmarks</h1>
        <p className="text-gray-500 mt-2">All your saved resources in one place.</p>
      </header>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={item.id}
              className="h-[15vh] w-full bg-[#E1EDFF] shadow rounded-xl flex items-center p-6 gap-7"
            >
              <div 
                className="h-[10vh] w-[6vw] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287676/file_u3nppe.png" className="h-[8vh]" alt="file" />
              </div>
              
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-md font-semibold text-gray-800">{item.Subject}</h1>
                <h6 className="text-md text-[#555]">{item.type} • {item.year} Year</h6>
              </div>

              <div className="ml-auto flex gap-4">
                <button 
                  onClick={() => removeBookmark(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm"
                >
                  Remove
                </button>
                <a href={item.publicUrl} target="_blank" rel="noreferrer">
                  <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287926/downlaod_deanpg.png" className="h-[30px]" alt="Download" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/bookmark_ijhiyr.png" className="h-32 opacity-20 mb-4" alt="empty" />
          <h2 className="text-xl font-semibold text-gray-400">No bookmarks saved yet!</h2>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;