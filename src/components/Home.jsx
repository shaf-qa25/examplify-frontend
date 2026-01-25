import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToSignup = () => {
    navigate('/login');
  };

  const handleNavigateToGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div
      className="min-h-screen relative flex flex-col md:flex-row items-center overflow-auto scroll-smooth"
      style={{
        background: 'linear-gradient(to right, #0A4A9D 15%, #2293F8 80%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
  
      <div className="flex items-center space-x-4 mb-10 mt-2 md:absolute md:top-10 md:left-12">
        <div className="bg-white rounded-full p-2">
          <img
            src="https://ucarecdn.com/e14db4a4-4e21-49ff-99ad-2f1831b0d607/-/preview/156x138/"
            alt="Examplify Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className="text-white">
          <h1 className="text-xl font-bold font-[InknutAntiqua]">Examplify</h1>
          <p className="text-sm text-white/50">Big Data Centre of Excellence</p>
        </div>
      </div>

      <div className="flex-1 text-center text-white w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6">
          Made for AKGIANS
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-white">
          Get personalised study tools, track your progress <br /> and connect
          with peers.
        </p>

        <button
          onClick={handleNavigateToGetStarted}
          className="mt-4 px-6 py-2 bg-[#003575] text-white rounded-2xl hover:bg-[#00255d] transition"
        >
          Get Started
        </button>

     
        <div className="flex justify-center mt-8 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 md:gap-20">
            {/* Card 1 */}
            <div className="bg-[#1b67ac] text-white p-4 rounded-lg shadow-2xl w-48 h-48 flex flex-col justify-center items-center">
              <img
                src="https://ucarecdn.com/88cc5411-0935-4a5e-a073-3cad62af9a67/-/preview/159x117/"
                alt="Playlist Logo"
                className="w-12 h-8 mx-auto mb-1"
              />
              <h3 className="mb-4 text-center">Recommended Playlist</h3>
              <p className="text-sm text-center">
                Find the best YouTube playlists tailored to your course.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1b67ac] text-white p-4 rounded-lg shadow-2xl w-48 h-48 flex flex-col justify-center items-center">
              <img
                src="https://ucarecdn.com/f6392ab3-dba1-44f0-a732-d3c341e19aeb/-/preview/129x100/"
                alt="Notes Logo"
                className="w-12 h-8 mx-auto mb-1"
              />
              <h3 className="mb-4 text-center">Notes</h3>
              <p className="text-sm text-center">
                Summarized and helpful notes at your fingertips.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1b67ac] text-white p-4 rounded-lg shadow-2xl w-48 h-48 flex flex-col justify-center items-center">
              <img
                src="https://ucarecdn.com/2612ffed-b393-4486-bb1e-0745cc46ff25/-/preview/117x103/"
                alt="News Logo"
                className="w-12 h-8 mx-auto mb-1"
              />
              <h3 className="mb-4 text-center">Latest News</h3>
              <p className="text-sm text-center">
                Stay updated with academic and campus news.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1b67ac] text-white p-4 rounded-lg shadow-2xl w-48 h-48 flex flex-col justify-center items-center">
              <img
                src="https://ucarecdn.com/5cbfcb67-a87d-4805-a2f6-476be86b4550/-/preview/108x108/"
                alt="Tracker Logo"
                className="w-12 h-8 mx-auto mb-1"
              />
              <h3 className="mb-4 text-center">Personal Tracker</h3>
              <p className="text-sm text-center">
                Track your goals and academic progress easily.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="relative md:static md:mt-0 flex flex-col items-center md:items-end w-full md:w-auto">
        <img
          src="https://ucarecdn.com/090bcc5e-22ea-40e7-b870-454eebac98de/"
          alt="Cloud"
          className="hidden md:block max-w-[300px] w-full h-screen"
        />
<div className="absolute flex flex-col items-center md:items-end w-full">
 
  <div className=" md:hidden w-full flex justify-center mt-4">
    <div className="flex flex-col items-center">
      <img
        src="https://ucarecdn.com/ba4aaf2d-a77e-46c3-982e-2ea7d17bd554/-/preview/183x183/"
        alt="signin"
        onClick={handleNavigateToSignup}
        className="w-12 h-12 rounded-full shadow-md cursor-pointer"
      />
      <button
        onClick={handleNavigateToSignup}
        className="text-black font-bold mt-1"
      >
        Sign In
      </button>
    </div>
  </div>


  <div className="hidden md:flex absolute top-8 right-8 flex-col items-center">
    <img
      src="https://ucarecdn.com/ba4aaf2d-a77e-46c3-982e-2ea7d17bd554/-/preview/183x183/"
      alt="signin"
      onClick={handleNavigateToSignup}
      className="w-12 h-12 rounded-full shadow-md cursor-pointer"
    />
    <button
      onClick={handleNavigateToSignup}
      className="text-black font-bold mt-1"
    >
      Sign In
    </button>
  </div>
</div>


      </div>
    </div>
  );
};

export default Home;
