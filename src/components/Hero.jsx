import { Link, NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col items-center text-center">

        {/* Eyebrow label */}
        <div className="nl-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          Academic Resource Hub
        </div>

        {/* Heading */}
        <h1 className="nl-fade-up nl-fade-up-1 text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[var(--text-primary)] leading-[1.12] mb-5 max-w-3xl">
          Your only place for{" "}
          <span className="text-[var(--accent)]">verified study notes</span>
        </h1>

        {/* Subtitle */}
        <p className="nl-fade-up nl-fade-up-2 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-10">
          Curated lecture notes, past exam papers, reference books and academic projects — organized by your university semester and branch.
        </p>

        {/* CTAs */}
        <div className="nl-fade-up nl-fade-up-3 flex flex-wrap items-center justify-center gap-3 mb-14">
          <NavLink
            to="/subjects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Browse Subjects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NavLink>
          <a
            href={import.meta.env.VITE_WHATSAPP_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
             bg-[#25D366] text-white
             hover:bg-[#20BD5A]
             active:scale-[0.98]
             transition-all duration-200"
          >
            Join WhatsApp Community
          </a>
        </div>

        {/* Social proof stats */}
        <div className="nl-fade-up nl-fade-up-3 grid grid-cols-3 gap-8 sm:gap-16 w-full max-w-lg">
          {[
            { value: "1,000+", label: "Study Resources" },
            { value: "100%", label: "Free Access" },
            { value: "24/7", label: "Always Available" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">{stat.value}</span>
              <span className="text-xs text-[var(--text-secondary)] mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}