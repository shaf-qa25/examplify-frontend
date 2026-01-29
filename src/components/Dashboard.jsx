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
import { useNavigate } from "react-router";
import { BookAIcon, Bookmark, BookOpenText, ChartNoAxesCombined, LayoutPanelLeft, LogOut, Newspaper, NotebookTabs, Share2, SquarePlay } from "lucide-react";



// ... baki imports same hain

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const navigate = useNavigate();

  const username = localStorage.getItem("Username") || "Guest User";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("Username");
    navigate("/login", { replace: true });
  };

  const sections = [
    { name: "Dashboard", icon: <LayoutPanelLeft size={22} />, component: <DashboardSection setActiveSection={setActiveSection} /> },
    { name: "Academic Resources", icon: <NotebookTabs size={22} />, component: <AcademicResources /> },
    { name: "Learning Centre", icon: <SquarePlay size={22} />, component: <LearningCentre /> },
    { name: "Progress Tracker", icon: <ChartNoAxesCombined size={22} />, component: <Progress /> },
    { name: "News & Events", icon: <Newspaper size={22} />, component: <Events /> },
    { name: "Resource Sharing", icon: <Share2 size={22} />, component: <Resource /> },
    { name: "Bookmarks", icon: <Bookmark size={22} />, component: <Bookmarks /> },
    { name: "PYQ Page", icon: <BookOpenText size={22} />, component: <Pages /> }
  ];

  const renderSection = () => {
    const active = sections.find((section) => section.name === activeSection);
    return active ? active.component : <p>Section not found.</p>;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#F4F8FF] p-4 shadow-md sticky top-0 h-full flex flex-col">

        {/* User Area */}
        <div className="w-full h-20 flex justify-around items-center bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] rounded-2xl mb-9 p-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-bold text-sm">{username}</h1>
            <h5 className="text-white text-[10px] opacity-80">CSE-AIML-2</h5>
          </div>
          <img
            src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744278454/image_77_kt35j6.png"
            className="h-12 w-12 rounded-full border-2 border-white/20"
            alt="user"
          />
        </div>

        {/* Menu Items */}
        <ul className="space-y-1 flex-1">
          {sections.map((section) => (
            <li key={section.name}>
              <Button
                variant="ghost" // 'default' se hover effect better aayega
                className={`w-full justify-start font-bold rounded-2xl mb-2 h-12 transition-all ${activeSection === section.name
                    ? "bg-gradient-to-r from-[#2293F8] to-[#0A4A9D] text-white shadow-lg"
                    : "text-gray-500 hover:bg-blue-50 hover:text-[#0A4A9D]"
                  }`}
                onClick={() => setActiveSection(section.name)}
              >
                {/* Icon rendering logic change ki hai yahan */}
                <span className={`${activeSection === section.name ? "text-white" : "text-gray-500"}`}>
                  {section.icon}
                </span>
                <span className="text-lg ml-3 font-semibold">{section.name}</span>
              </Button>
            </li>
          ))}
        </ul>

        {/* Logout button niche push ho jaye isliye mt-auto */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            className="w-full justify-start font-bold rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none h-12"
          >
            <LogOut className="w-6 h-6 mr-3" />
            <span className="text-lg">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 overflow-y-auto bg-white">
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;