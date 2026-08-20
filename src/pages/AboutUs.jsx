import React from "react";
import { Link } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";

const STATS = [
  { value: "1000+", label: "Learning Resources" },
  { value: "500+", label: "Students Connected" },
  { value: "24/7", label: "Platform Availability" },
  { value: "100%", label: "Free Open Access" },
];

const MISSIONS = [
  {
    icon: "🎯",
    title: "Our Mission",
    desc: "To provide students with a centralized platform where educational resources are easy to discover, organized, reliable, and available anytime.",
  },
  {
    icon: "🚀",
    title: "Our Vision",
    desc: "To become one of the most trusted digital learning ecosystems that empowers students across universities through technology and collaboration.",
  },
];

const VALUES = [
  "Student First",
  "Quality Learning",
  "Innovation & Speed",
  "Open Accessibility",
  "Continuous Improvement",
];

const FEATURES = [
  { icon: "📚", title: "Study Notes", desc: "Well-organized notes prepared by students and faculty." },
  { icon: "📝", title: "Previous Year Papers", desc: "Access university examination papers for better preparation." },
  { icon: "📖", title: "Books & Resources", desc: "Discover useful books, reference materials, and learning guides." },
  { icon: "⚡", title: "Easy Search", desc: "Quick find subjects, semesters, and study materials in seconds." },
  { icon: "☁️", title: "Secure Access", desc: "Access your resources securely from anywhere and anytime." },
  { icon: "🎓", title: "Student Community", desc: "Helping students learn together by sharing valuable educational content." },
];

const TEAM = [
  { initials: "RC", name: "Rohit Kumar Chaurasiya", role: "Founder & Full Stack Developer" },
  { initials: "AK", name: "Arya Karn", role: "Frontend Developer" },
  { initials: "NT", name: "NotesLink Team", role: "Content & Student Support" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans w-full">
      
      {/* HERO BANNER */}
      <section 
        className="w-full relative pt-16 pb-20 px-6 text-center text-white bg-cover bg-center border-b border-[#6366f1]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(79, 70, 229, 0.95), rgba(99, 102, 241, 0.92)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <img
            src={NotesLinkFullLogo}
            alt="NotesLink Logo"
            className="h-12 w-auto object-contain mb-6 bg-white/95 rounded-lg px-3 py-1.5 shadow-sm"
          />
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1 rounded-full mb-3 backdrop-blur-sm">
            Empowering Students Through Technology
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Building the Future of <span className="underline decoration-indigo-300">Smart Learning</span>
          </h1>
          <p className="text-base sm:text-lg font-light opacity-95 leading-relaxed">
            NotesLink is an academic resource platform designed to simplify the way students access notes, previous year question papers, study materials, books, and learning resources—all in one place.
          </p>
        </div>
      </section>

      {/* STATS STRIP (Elevated and z-indexed) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center">
              <h2 className="text-3xl font-extrabold text-[#4f46e5]">{stat.value}</h2>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / WHO WE ARE SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4f46e5] bg-indigo-50 px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Centralized Hub Built For Every Student
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              NotesLink was created with one simple goal—making quality educational resources easily accessible to every student.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instead of searching through multiple websites, chaotic social media groups, and dead drive links, students can discover everything they need inside one unified, organized platform.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our platform combines technology with education to create a seamless learning experience that saves time, improves productivity, and helps students focus on what truly matters—learning.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-8 shadow-inner space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-xl">🚀</span> Growing Every Day
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We are constantly onboarding new university branches, exam schemes, and lecture archives to bring dependable study materials directly to your screen.
            </p>
            <div className="pt-2 border-t border-indigo-200/60 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-700">
                <span>Verified Notes & Question Banks</span>
                <span className="text-[#4f46e5] font-bold">100% Curated</span>
              </div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700">
                <span>Direct Access</span>
                <span className="text-[#4f46e5] font-bold">Zero Paywalls</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION, VISION & VALUES SECTION */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {MISSIONS.map((item, index) => (
              <div key={index} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-start">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-start">
              <div className="text-3xl mb-3">💙</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Our Values</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {VALUES.map((val, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]"></span>
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES / WHAT NOTESLINK OFFERS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4f46e5] bg-indigo-50 px-3 py-1 rounded-full">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            What NotesLink Offers
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Everything structured and organized for seamless semester preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-base font-bold text-slate-800 mb-1">{feature.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4f46e5] bg-indigo-50 px-3 py-1 rounded-full">
              Leadership & Builders
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Meet Our Team
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Behind NotesLink is a passionate team dedicated to improving the student learning experience through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center hover:border-slate-300 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#818cf8] text-white font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                  {member.initials}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{member.name}</h3>
                <span className="text-xs text-[#4f46e5] font-medium">{member.role}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] rounded-3xl p-8 sm:p-12 text-white text-center shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Join the Learning Community
          </h2>
          <p className="text-sm font-light opacity-90 max-w-xl mx-auto mb-6 leading-relaxed">
            Thousands of educational resources. One platform. Endless learning opportunities.
          </p>
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#4f46e5] font-semibold text-sm rounded-xl shadow-sm hover:bg-slate-100 transition-colors"
          >
            <span>Explore NotesLink</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}