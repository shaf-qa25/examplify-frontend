import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardSection from "./Pages/Main";
import AcademicResources from "./Pages/Academic";
import LearningCentre from "./Pages/Learning";
import Bookmarks from "./Pages/Bookmarks";
import Events from "./Pages/Events";
import Progress from "./Pages/Progress";
import Resource from "./Pages/Resource";
import Pages from "./Pages";



const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sections = [
    { name: "Dashboard", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279409/dashboard_hika0d.png",  component: <DashboardSection setActiveSection={setActiveSection} />  },
    { name: "Academic Resources", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/academic_nikbtp.png", component: <AcademicResources /> },
    { name: "Learning Centre", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744279384/learning_xgewgp.png", component: <LearningCentre /> },
    { name: "Progress Tracker", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/progress_nkdhj9.png", component: <Progress /> },
    { name: "News & Events", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/news_vhxbtl.png", component: <Events /> },
    { name: "Resource Sharing", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/resource_zmjyg7.png", component: <Resource /> },
    { name: "Bookmarks", icon: "https://res.cloudinary.com/dll6vk0kp/image/upload/v1744280113/bookmark_ijhiyr.png", component: <Bookmarks /> },
    {name: "PYQ Page", icon: "",component: <Pages />}
  ];
  

  const renderSection = () => {
    const active = sections.find((section) => section.name === activeSection);
    return active ? active.component : <p>Section not found.</p>;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#F4F8FF] p-4 shadow-md sticky top-0 h-full">
      <div className="w-full border h-15 flex justify-around bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] rounded-2xl mb-9">
          <div className="flex flex-col justify-center ">
            <h1 className="text-white font-bold">Pranay Srivastava</h1>
            <h5 className="text-white">CSE-AIML-2</h5>
          </div>
          <img src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744278454/image_77_kt35j6.png"></img>
        </div>
        <ul className="space-y-2">
        {sections
            .filter((section) => section.icon) 
            .map((section) => (
            <li key={section.name}>
              <Button
                variant={activeSection === section.name ? "default" : "default  "}
                className={`w-full justify-start font-bold rounded-4xl mb-2 ${
                  activeSection === section.name
                    ? "bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] text-white "
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={() => setActiveSection(section.name)}
              >
                <img
                  src={section.icon}
                  alt={`${section.name} Icon`}
                  className={`w-6 h-6 transition-all ${
                    activeSection === section.name ? "filter invert brightness-0" : ""
                  }`}
                />
                <h1 className="text-xl ml-2">{section.name}</h1>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 overflow-y-auto">
            {/* <h2 className="text-2xl font-semibold mb-4">{activeSection}</h2> */}
            {renderSection()}
          
       
      </div>
    </div>
  );
};

export default Dashboard;
