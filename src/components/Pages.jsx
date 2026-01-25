import React, { useEffect, useState } from "react";

const Pages = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);

  useEffect(() => {
    fetch("https://backend-examplify.vercel.app/v1/api/pdf/getpdf")
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : data.data || [];
        const sorted = result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        setPyqs(sorted);
        setFilteredPyqs(sorted);
      })
      .catch((err) => console.error("Failed to fetch PYQs:", err));
  }, []);

  const colors = [
    "#FFB6B9",
    "#FCD5CE",
    "#D8E2DC",
    "#A0C4FF",
    "#B5EAD7",
    "#FFDAC1",
    "#E2F0CB",
    "#C7CEEA"
  ];

  const [filters, setFilters] = useState({
    years: [],
    exams: [],
    branch: "",
    subject: "",
    semester: "",
    session: ""
  });

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((i) => i !== value)
          : [...list, value]
      };
    });
  };

  const handleSelectChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...pyqs];

    if (filters.years.length) {
      const mappedYears = filters.years.map((y) => y[0]); // "1st year" -> "1"
      filtered = filtered.filter((pyq) => mappedYears.includes(pyq.year));
    }

    if (filters.exams.length) {
      filtered = filtered.filter((pyq) => filters.exams.includes(pyq.type));
    }

    if (filters.branch) {
      filtered = filtered.filter((pyq) => pyq.branch === filters.branch);
    }

    if (filters.subject) {
      filtered = filtered.filter((pyq) => pyq.subject === filters.subject);
    }

    if (filters.semester) {
      filtered = filtered.filter((pyq) => pyq.semester === filters.semester);
    }

    if (filters.session) {
      filtered = filtered.filter((pyq) => pyq.session === filters.session);
    }

    setFilteredPyqs(filtered);
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="w-full max-w-6xl flex gap-12">
        {/* FILTER PANEL */}
        <div className="w-1/3 sticky top-10 h-[90vh] overflow-y-auto">
          <div className="bg-[#0330C2] text-white text-xl font-semibold px-6 py-3 rounded-full mb-6 shadow flex items-center space-x-3 justify-center">
            <img
              src="https://ucarecdn.com/f4a13fdf-910b-44fb-b5f4-6a80f4ccc5cf/-/preview/57x60/"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span>Filters</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Year */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-md font-semibold mb-3">Year</h2>
              <div className="space-y-2">
                {["1st year", "2nd year", "3rd year", "4th year"].map((year, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="year"
                      checked={filters.years.includes(year)}
                      onChange={() => handleCheckboxChange("years", year)}
                    />
                    <span className="text-sm">{year}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exam */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-md font-semibold mb-3">Exam</h2>
              <div className="space-y-2">
                {["ST", "PUT", "UT"].map((exam, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="exam"
                      checked={filters.exams.includes(exam)}
                      onChange={() => handleCheckboxChange("exams", exam)}
                    />
                    <span className="text-sm">{exam}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Branch & Subject */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl p-4">
              <h2 className="text-md font-semibold mb-3">Branch</h2>
              <select
                className="w-full px-2 py-1 border border-gray-600 text-gray-600 rounded-full"
                value={filters.branch}
                onChange={(e) => handleSelectChange("branch", e.target.value)}
              >
                <option value="">Select</option>
                {[
                  "CSE",
                  "CS",
                  "CS-IT",
                  "CSE-DS",
                  "CSE-HINDI",
                  "IT",
                  "CSE-AIML",
                  "AIML",
                  "ECE",
                  "ME",
                  "EN",
                  "CIVIL"
                ].map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl p-4">
              <h2 className="text-md font-semibold mb-3">Subject</h2>
              <select
                className="w-full px-2 py-1 border border-gray-600 text-gray-600 rounded-full"
                value={filters.subject}
                onChange={(e) => handleSelectChange("subject", e.target.value)}
              >
                <option value="">Select</option>
                {["DSA", "Maths", "Networks", "Electronics", "COA"].map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Semester & Session */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="rounded-xl p-4">
              <h2 className="text-md font-semibold mb-3">Semester</h2>
              <select
                className="w-full px-2 py-1 border border-gray-600 text-gray-600 rounded-full"
                value={filters.semester}
                onChange={(e) => handleSelectChange("semester", e.target.value)}
              >
                <option value="">Select</option>
                {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl p-4">
              <h2 className="text-md font-semibold mb-3">Session</h2>
              <select
                className="w-full px-2 py-1 border border-gray-600 text-gray-600 rounded-full"
                value={filters.session}
                onChange={(e) => handleSelectChange("session", e.target.value)}
              >
                <option value="">Select</option>
                {["2021-22", "2022-23", "2023-24", "2024-25"].map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-8 flex justify-center">
            <button
              className="bg-[#0330C2] text-white px-6 py-3 rounded-full shadow hover:bg-blue-800 transition"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="w-2/3 h-[90vh] overflow-y-auto pr-2">
          <div className="mt-8 space-y-4">
            {filteredPyqs.length > 0 ? (
              filteredPyqs.map((pyq, index) => (
                <div
                  key={pyq._id || index}
                  className="h-[15vh] w-full bg-[#E1EDFF] shadow rounded-xl"
                >
                  <div className="p-6 flex gap-7 items-center">
                    <div
                      className="h-[10vh] w-[6vw] rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    >
                      <img
                        src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287676/file_u3nppe.png"
                        className="h-[8vh]"
                        alt="file"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-md">{pyq.Subject}</h1>
                      <h6 className="text-md text-[#555]">
                        {pyq.type} • {pyq.year} Year
                      </h6>
                    </div>
                    <a
                      href={pyq.publicUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto"
                    >
                      <img
                        src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287926/downlaod_deanpg.png"
                        className="h-[30px]"
                        alt="Download"
                      />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No PYQs found for selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
