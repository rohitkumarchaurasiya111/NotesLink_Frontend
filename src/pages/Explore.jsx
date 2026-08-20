import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";

const CATEGORIES = [
  {
    id: "all",
    label: "All Hubs",
    icon: "🌐",
  },
  {
    id: "notes",
    label: "Lecture Notes",
    icon: "📚",
    route: "/subjects",
  },
  {
    id: "pyqs",
    label: "PYQs & Question Banks",
    icon: "📝",
    route: "/subjects",
  },
  {
    id: "books",
    label: "Reference Books",
    icon: "📖",
    route: "/books",
  },
  {
    id: "projects",
    label: "Capstone & Projects",
    icon: "💻",
    route: "/projects",
  },
];

const POPULAR_SUBJECTS = [
  {
    id: "cs-os",
    name: "Operating Systems",
    code: "CS301",
    branch: "Computer Science",
    notesCount: 24,
    pyqCount: 8,
    badge: "Trending",
  },
  {
    id: "cs-dbms",
    name: "Database Management Systems",
    code: "CS402",
    branch: "Information Technology",
    notesCount: 31,
    pyqCount: 12,
    badge: "High Yield",
  },
  {
    id: "cs-dsa",
    name: "Data Structures & Algorithms",
    code: "CS201",
    branch: "Computer Science",
    notesCount: 45,
    pyqCount: 15,
    badge: "Essential",
  },
  {
    id: "ec-dsp",
    name: "Digital Signal Processing",
    code: "EC503",
    branch: "Electronics & Comm.",
    notesCount: 18,
    pyqCount: 6,
    badge: "Updated",
  },
  {
    id: "me-thermo",
    name: "Thermodynamics",
    code: "ME202",
    branch: "Mechanical Engineering",
    notesCount: 15,
    pyqCount: 5,
    badge: null,
  },
  {
    id: "ee-ctrl",
    name: "Control Systems",
    code: "EE401",
    branch: "Electrical Engineering",
    notesCount: 22,
    pyqCount: 9,
    badge: null,
  },
];

const CURATED_COLLECTIONS = [
  {
    title: "Semester Exam Fast-Track",
    description: "Condensed one-night formula sheets, blueprint guides, and high-frequency PYQs.",
    count: "120+ Documents",
    color: "from-blue-500 to-indigo-600",
    link: "/subjects",
  },
  {
    title: "Major & Minor Project Vault",
    description: "Full-stack codebases, IEEE project reports, and system architecture blueprints.",
    count: "45+ Repositories",
    color: "from-indigo-600 to-purple-600",
    link: "/projects",
  },
  {
    title: "Standard Reference Textbook PDFs",
    description: "Curated engineering textbooks, solutions manuals, and author supplements.",
    count: "80+ Volumes",
    color: "from-sky-500 to-blue-600",
    link: "/books",
  },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/subjects?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const filteredSubjects = POPULAR_SUBJECTS.filter((subject) => {
    const query = searchQuery.toLowerCase();
    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query) ||
      subject.branch.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans w-full">
      
      {/* HERO BANNER */}
      <section 
        className="w-full relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center text-white bg-cover bg-center border-b border-[#6366f1]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(79, 70, 229, 0.95), rgba(99, 102, 241, 0.92)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <img
            src={NotesLinkFullLogo}
            alt="NotesLink Logo"
            className="h-10 w-auto object-contain mb-4 bg-white/95 rounded-lg px-3 py-1.5 shadow-sm"
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 drop-shadow-sm">
            Explore Study Repositories
          </h1>
          <p className="text-sm sm:text-base font-light opacity-95 max-w-xl mx-auto mb-8 leading-relaxed">
            Discover verified lecture transcripts, past exam questions, engineering textbooks, and academic code repositories across all university branches.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl bg-white rounded-2xl p-1.5 shadow-xl flex items-center gap-2 border border-slate-100"
          >
            <div className="pl-3 text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject name, course code (e.g. CS301)..."
              className="w-full px-2 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer flex-shrink-0"
            >
              Search Hub
            </button>
          </form>
        </div>
      </section>

      {/* QUICK CATEGORY PILLS (Properly Z-Indexed & Spaced) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
        <div className="flex items-center gap-3 overflow-x-auto p-1.5 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (cat.route) navigate(cat.route);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-md border cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#4f46e5] text-white border-[#4f46e5] ring-2 ring-indigo-300"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-[#4f46e5]"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED CURATED VAULTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded-full">
            Curated Highlights
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Featured Study Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_COLLECTIONS.map((col, idx) => (
            <Link
              to={col.link}
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${col.color}`} />
              
              <div>
                <span className="text-xs font-semibold text-[#4f46e5] bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {col.count}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#4f46e5] transition-colors mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-bold text-[#4f46e5] group-hover:translate-x-1 transition-transform">
                <span>Browse Collection</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING SUBJECT DIRECTORY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4f46e5] bg-indigo-50 px-2.5 py-1 rounded-full">
              High Traffic Modules
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Popular Semester Subjects
            </h2>
          </div>
          <Link
            to="/subjects"
            className="text-xs sm:text-sm font-semibold text-[#4f46e5] hover:underline flex items-center gap-1"
          >
            <span>View All Subjects</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {sub.code}
                    </span>
                    {sub.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">
                        {sub.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{sub.branch}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>📄 {sub.notesCount} Notes</span>
                    <span>📝 {sub.pyqCount} PYQs</span>
                  </div>
                  <Link
                    to={`/subject/${sub.id}/${encodeURIComponent(sub.name)}`}
                    className="text-xs font-bold text-[#4f46e5] hover:underline"
                  >
                    Open Hub →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-sm text-slate-500 mb-2">No subjects found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#4f46e5] font-semibold underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* FOOTER CALLOUT BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1">Looking for your college syllabus?</h3>
            <p className="text-xs sm:text-sm font-light opacity-90">
              Sign in with your official university domain email to unlock college-exclusive modules.
            </p>
          </div>
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-[#4f46e5] font-semibold text-xs sm:text-sm rounded-xl shadow-sm hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            College Sign In
          </Link>
        </div>
      </section>

    </div>
  );
}