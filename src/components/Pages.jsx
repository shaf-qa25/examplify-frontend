import React, { useEffect, useState } from "react";
import { dummyPyqs } from "@/api/Pyqdummy";
import { Bookmark, Download } from "lucide-react";

const Pages = () => {
  const [pyqs, setPyqs] = useState(dummyPyqs);
  const [filteredPyqs, setFilteredPyqs] = useState(dummyPyqs);
  const [bookmarked, setBookmarks] = useState([]);

  // useEffect(() => {
  //   fetch(dummyPyqs)
  //     .then((res) => {
  //       console.log("response aa rha h ");
  //       res.json()
  //     })
  //     .then((data) => {
  //       console.log("data aa rha h ");
  //       const result = Array.isArray(data) ? data : data.data || [];
  //       const sorted = result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  //       setPyqs(sorted);
  //       setFilteredPyqs(sorted);
  //     })
  //     .catch((err) => console.error("Failed to fetch PYQs:", err));
  // }, []);

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

  // const handleCheckboxChange = (type, value) => {
  //   setFilters((prev) => {
  //     const list = prev[type];
  //     return {
  //       ...prev,
  //       [type]: list.includes(value)
  //         ? list.filter((i) => i !== value)
  //         : [...list, value]
  //     };
  //   });
  // };



  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const list = prev[type];    //dynamic allocation
      return {
        ...prev, [type]: list.includes(value) ? list.filter((i) => i !== value) : [...list, value]
      }
    })
  }

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

  const handleClearFilter = () => {
    setFilters({
      years: [],
      exams: [],
      branch: "",
      subject: "",
      semester: "",
      session: ""
    })
    setFilteredPyqs(pyqs)
  }


  const handleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 px-4">
      <div className="w-full max-w-6xl flex gap-8">

        {/* FILTER PANEL - Width thodi kam ki hai aur compact banaya hai */}
        <div className="w-1/4 sticky top-6 h-fit max-h-[90vh] overflow-y-auto bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-[#0330C2] text-white text-lg font-semibold px-4 py-2 rounded-full mb-5 shadow-md flex items-center justify-center gap-2">
            <img
              src="https://ucarecdn.com/f4a13fdf-910b-44fb-b5f4-6a80f4ccc5cf/-/preview/57x60/"
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
            <span>Filters</span>
          </div>

          <div className="space-y-5">
            {/* Year & Exam - Compact grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b pb-3">
                <h2 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Year</h2>
                <div className="grid grid-cols-2 gap-2">
                  {["1st year", "2nd year", "3rd year", "4th year"].map((year, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        className="rounded text-[#0330C2]"
                        checked={filters.years.includes(year)}
                        onChange={() => handleCheckboxChange("years", year)}
                      />
                      <span className="text-xs text-gray-600">{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-b pb-3">
                <h2 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Exam</h2>
                <div className="flex flex-wrap gap-3">
                  {["ST", "PUT", "UT"].map((exam, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded text-[#0330C2]"
                        checked={filters.exams.includes(exam)}
                        onChange={() => handleCheckboxChange("exams", exam)}
                      />
                      <span className="text-xs text-gray-600 font-medium">{exam}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdowns - Chote aur clean selectors */}
            <div className="space-y-3">
              {[
                { label: "Branch", key: "branch", options: ["CSE", "CS", "IT", "ECE", "ME"] },
                { label: "Subject", key: "subject", options: ["DSA", "Maths", "Networks", "COA"] },
                { label: "Semester", key: "semester", options: ["1st", "3rd", "5th", "7th"] }
              ].map((group) => (
                <div key={group.key}>
                  <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">{group.label}</label>
                  <select
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters[group.key]}
                    onChange={(e) => handleSelectChange(group.key, e.target.value)}
                  >
                    <option value="">All {group.label}s</option>
                    {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Buttons - Ek line mein compact set kiya */}
            <div className="flex flex-col gap-2 pt-4">
              <button
                className="w-full bg-[#0330C2] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 shadow-sm transition-all active:scale-95"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="w-full text-red-500 text-xs font-semibold hover:underline"
                onClick={handleClearFilter}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL - Cards ko chota aur clean banaya hai */}
        <div className="w-3/4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Results ({filteredPyqs.length})</h2>
          <div className="grid grid-cols-1 gap-3">
            {filteredPyqs.length > 0 ? (
              filteredPyqs.map((pyq, index) => {
                const isBookmarked = bookmarked.includes(pyq._id);
                return (
                  <div
                    key={pyq._id || index}
                    className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      >
                        <img
                          src="https://res.cloudinary.com/dll6vk0kp/image/upload/v1744287676/file_u3nppe.png"
                          className="h-7 w-7 object-contain"
                          alt="file"
                        />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-800 leading-tight">{pyq.Subject}</h1>
                        <p className="text-xs text-gray-500 font-medium">
                          {pyq.type} • Semester {pyq.semester} • {pyq.session}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleBookmark(pyq._id)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Bookmark
                          size={20}
                          fill={isBookmarked ? "#0330C2" : "none"}
                          color={isBookmarked ? "#0330C2" : "#94a3b8"}
                        />
                      </button>
                      <a
                        href={pyq.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-50 text-[#0330C2] rounded-full hover:bg-[#0330C2] hover:text-white transition-all shadow-sm"
                      >
                        <Download size={18} />
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400">No resources match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
