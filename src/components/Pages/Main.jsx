import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

function Main({ setActiveSection }) {
  const [pyqs, setPyqs] = useState([]);
  const colors = ["#D72000", "#1646B5", "#1E7C09", "#890695", "#00A703", "#002783"];


  const username = localStorage.getItem("Username") || "Guest User";

  useEffect(() => {
    const testUrl = `https://examplify-backend-2026.vercel.app/v1/api/pdf/getpdf?branch=CSE&year=3&semester=5th&type=PUT`;

    console.log("Testing with URL:", testUrl);

    fetch(testUrl)
      .then(res => res.json())
      .then(data => {
        console.log("Raw Response from Backend:", data);
        if (data.success && data.data && data.data.length > 0) {
          setPyqs(data.data.slice(0, 3));
        } else {
          console.log("Response toh aaya par data khaali hai. Status check kar Sanyam se.");
        }
      })
      .catch(err => console.error("Network Error:", err));
  }, []);
  return (
    <div>
      <div className="w-full border h-[20vh] flex justify-between bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] rounded-2xl">
        <div className="flex flex-col justify-center gap-3 items-center ml-10">
          <h1 className="text-white font-bold text-4xl">Welcome back, {username}</h1>
          <h5 className="text-white">You've completed 70% of your weekly tasks. Keep it up!</h5>
        </div>
        <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744278454/image_77_kt35j6.png"></img>
      </div>
      <div className=' p-9'>
        <h2 className='text-2xl font-semibold'>Your Contributions</h2>
        <div className='flex gap-[2rem] mt-5'>
          <div className='h-[25vh] w-[34vw] bg-[#F4F8FF] flex gap-[8rem] shadow'>
            <div>
              <div className='flex gap-4 p-5'>
                <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/academic_nikbtp.png" className='h-[5vh]'></img>
                <h1 className='text-2xl font-semibold mt-2'>Notes</h1>
              </div>
              <div className='px-5'>
                <h5 className='text-[#969696]'>You are 70% away from your<br />diamond badge.</h5>
              </div>
              <div className='px-5'>
                <div className='w-[13vw] bg-gray-300 rounded-full h-2 mt-4'>
                  <div
                    className='h-full rounded-full'
                    style={{
                      width: '30%',
                      background: 'linear-gradient(to right, #2293F8, #0A4A9D)',
                    }}
                  ></div>
                  <div className='mt-2'>
                    <span className='text-xl font-semibold text-[#0D0D0D] opacity-[50%]'>3/10</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744284965/notes_wgvfzd.png" className='h-[12vh] mt-[5vh]'></img>
            </div>

          </div>
          <div className='h-[25vh] w-[34vw] bg-[#F4F8FF] flex gap-[8rem] shadow'>
            <div>
              <div className='flex gap-4 p-5'>
                <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/academic_nikbtp.png" className='h-[5vh]'></img>
                <h1 className='text-2xl font-semibold mt-2'>PYQ’S/Solution</h1>
              </div>
              <div className='px-5'>
                <h5 className='text-[#969696]'>You are 40% away from your<br />silver badge.</h5>
              </div>
              <div className='px-5'>
                <div className='w-[13vw] bg-gray-300 rounded-full h-2 mt-4'>
                  <div
                    className='h-full rounded-full'
                    style={{
                      width: '40%',
                      background: 'linear-gradient(to right, #2293F8, #0A4A9D)',
                    }}
                  ></div>
                  <div className='mt-2'>
                    <span className='text-xl font-semibold text-[#0D0D0D] opacity-[50%]'>4/10</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744284965/pyq_eh4soa.png" className='h-[12vh] mt-[5vh]'></img>
            </div>

          </div>
        </div>
      </div>
      <div className='p-9'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-semibold'>Latest Updates</h2>
          <Button
            variant={"default"}
            className={"w-[8vw] justify-start font-bold rounded-4xl mb-2 bg-[#0330C2] "}
          >
            <h1 className="text-xl ml-2">View All</h1>
          </Button>
        </div>
        <div className='h-[36vh] w-full bg-[#6999E1] mt-3 rounded-2xl flex flex-col justify-around p-4 gap-2'>
          <div className='h-[15vh] w-full bg-[#E1EDFF] shadow'>
            <div className='p-6 flex gap-7'>
              <div className='h-[10vh] w-[6vw] bg-[#00A703] rounded-2xl'>
                <h1 className='p-5 mt-2 font-semibold text-white'>15 May</h1>
              </div>
              <div>
                <h1 className='text-2xl font-semibold'>Career Fair: Tech Companies Showcase</h1>
                <h6 className='font-medium text-[#969696]'>Join us at the Student Union building for networking opportunities with top tech companies.
                </h6>
                <div className='flex'>
                  <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744286957/time_amhkra.png" className='h-[2vh] mt-1 mr-2' /><h6 className='text-[#78A0FF]'>10:00 AM - 4:00 PM</h6>
                </div>
              </div>
            </div>
          </div>
          <div className='h-[15vh] w-full bg-[#E1EDFF] shadow'>
            <div className='h-[15vh] w-full bg-[#E1EDFF] shadow'>
              <div className='p-6 flex gap-7'>
                <div className='h-[10vh] w-[6vw] bg-[#002783] rounded-2xl'>
                  <h1 className='p-5 mt-2 font-semibold text-white'>17 May</h1>
                </div>
                <div>
                  <h1 className='text-2xl font-semibold'>Career Fair: Tech Companies Showcase</h1>
                  <h6 className='font-medium text-[#969696]'>Join us at the Student Union building for networking opportunities with top tech companies.
                  </h6>
                  <div className='flex'>
                    <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744286957/time_amhkra.png" className='h-[2vh] mt-1 mr-2' /><h6 className='text-[#78A0FF]'>10:00 AM - 4:00 PM</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='p-9'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-semibold'>Previous Year Questions</h2>
          <Button
            variant="default"
            className="w-[8vw] justify-start font-bold rounded-4xl mb-2 bg-[#0330C2]"
            onClick={() => setActiveSection("PYQ Page")}
          >
            <h1 className="text-xl ml-2">View All</h1>
          </Button>
        </div>

        <div className='h-[52vh] w-full bg-[#6999E1] mt-3 rounded-2xl flex flex-col justify-around p-4 gap-2 overflow-y-auto'>
          {Array.isArray(pyqs) && pyqs.length > 0 ? (
            pyqs.map((pyq, index) => (
              <div key={pyq._id || index} className='h-[15vh] w-full bg-[#E1EDFF] shadow rounded-xl'>
                <div className='p-6 flex gap-7 items-center'>
                  <div
                    className='h-[10vh] w-[6vw] rounded-2xl flex items-center justify-center'
                    style={{ backgroundColor: colors[index % colors.length] }}
                  >
                    <img
                      src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287676/file_u3nppe.png"
                      className='h-[8vh]'
                      alt="file"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className='text-2xl font-md'>{pyq.Subject}</h1>
                    <h6 className='text-md text-[#555]'>{pyq.type} • {pyq.year} Year</h6>
                  </div>
                  <a
                    href={pyq.publicUrl}
                    download
                    target='_blank'
                    rel='noopener noreferrer'
                    className='ml-auto'
                  >
                    <img
                      src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287926/downlaod_deanpg.png"
                      className='h-[30px]'
                      alt="Download"
                    />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg text-center mt-4">No PYQs available.</div>
          )}
        </div>
      </div>

      {/* Learning Centre Preview Section */}
      <div className='p-9'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold'>Learning Resources</h2>
          <Button
            variant="default"
            className="w-[8vw] justify-start font-bold rounded-4xl mb-2 bg-[#0330C2]"
            onClick={() => setActiveSection("Learning Centre")}
          >
            <h1 className="text-xl ml-2">View All</h1>
          </Button>
        </div>

        {/* Horizontal Cards for Learning */}
        <div className='flex gap-6 mt-3'>
          {[
            { title: "DS", channel: "Gateway", color: "#EEF1FF" },
            { title: "coa", channel: "gateway", color: "#E2F0CB" }
          ].map((item, index) => (
            <div
              key={index}
              className='h-[18vh] w-1/2 rounded-2xl p-6 flex justify-between items-center shadow-sm cursor-pointer hover:shadow-md transition'
              style={{ backgroundColor: item.color }}
              onClick={() => setActiveSection("Learning Centre")}
            >
              <div>
                <h3 className='text-xl font-bold text-gray-800'>{item.title}</h3>
                <p className='text-gray-600'>{item.channel}</p>
                <p className='text-[#2293F8] font-bold mt-2 text-sm'>Start Learning →</p>
              </div>
              <img
                src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/learning_xgewgp.png"
                className='h-[10vh] opacity-30'
                alt="icon"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main