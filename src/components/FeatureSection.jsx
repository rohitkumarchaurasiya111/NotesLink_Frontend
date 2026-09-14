import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Verified Study Notes",
    description: "High-yield lecture summaries organized strictly by your university syllabus, year, and branch.",
    href: "/subjects",
    linkLabel: "Explore notes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Previous Year Papers",
    description: "University question banks and solved exam papers to understand pattern trends and score higher.",
    href: "/subjects",
    linkLabel: "View PYQs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Books & Projects",
    description: "Recommended reference textbooks, lab guides, and verified academic project repositories in one hub.",
    href: "/books",
    linkLabel: "Browse library",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

function FeatureCard({ icon, title, description, href, linkLabel }) {
  return (
    <div className="flex flex-col p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-all duration-200 group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-5">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
        {description}
      </p>

      {/* Link */}
      <Link
        to={href}
        className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-[var(--accent)] hover:opacity-75 transition-opacity"
      >
        {linkLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

export default function FeatureSection() {
  return (
    <section className="bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">
            Why Choose NotesLink
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] max-w-xl">
            Everything you need to ace your semester
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feat) => (
            <FeatureCard key={feat.title} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
}