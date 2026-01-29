import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence se delete smooth hoga

const Bookmarks = () => {
  // Initial state directly localStorage se check kar lo
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('my bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync: Jab bhi bookmarks array change ho, storage apne aap update ho jaye
  useEffect(() => {
    localStorage.setItem('my bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const removeBookmark = (id) => {
    // Ab storage ki chinta nahi, sirf state filter karo
    setBookmarks(prev => prev.filter(item => item._id !== id));
  };

  const colors = ["#FFB6B9", "#A0C4FF", "#B5EAD7", "#C7CEEA"];

  return (
    <div className="p-8 min-h-screen bg-white">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">My Bookmarks</h1>
        <p className="text-gray-500 mt-2">All your saved resources in one place.</p>
      </header>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence> {/* Isse items exit hote waqt bhi animate honge */}
            {bookmarks.map((item, index) => (
              <motion.div
                layout // Smooth transition for remaining items
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item._id} // ID hamesha consistent rakho (_id)
                className="h-[15vh] w-full bg-[#E1EDFF] shadow-sm rounded-xl flex items-center p-6 gap-7 border border-blue-100"
              >
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  <img
                    src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287676/file_u3nppe.png"
                    className="h-10 w-10 object-contain"
                    alt="file"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{item.Subject}</h1>
                  <h6 className="text-sm md:text-md text-[#555]">{item.type} • {item.year} Year</h6>
                </div>

                <div className="ml-auto flex items-center gap-6">
                  <button
                    onClick={() => removeBookmark(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors"
                  >
                    REMOVE
                  </button>
                  <a
                    href={item.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:scale-110 transition-transform"
                  >
                    <img
                      src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287926/downlaod_deanpg.png"
                      className="h-8 w-8"
                      alt="Download"
                    />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/bookmark_ijhiyr.png"
            className="h-32 opacity-20 mb-4"
            alt="empty"
          />
          <h2 className="text-xl font-semibold text-gray-400">No bookmarks saved yet!</h2>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;