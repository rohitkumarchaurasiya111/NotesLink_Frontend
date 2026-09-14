import { Link } from "react-router-dom";
import FeatureSection from "../components/FeatureSection";
import Hero from "../components/Hero";

const STEPS = [
  {
    step: "01",
    title: "Select your year & branch",
    desc: "Filter through 1st to 4th year curriculum and pick your specific university branch.",
  },
  {
    step: "02",
    title: "Access verified materials",
    desc: "Browse module-wise notes, formula sheets, and 5 years of past question papers.",
  },
  {
    step: "03",
    title: "Study and excel",
    desc: "Prepare with focused resources, solve past trends, build projects, and score confidently.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureSection />

      {/* ── How it works ─────────────────────────────────── */}
      <section className="bg-[var(--bg-base)] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">
              Simple Workflow
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] max-w-xl">
              Three steps to exam readiness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center md:items-start md:text-left">
                <span className="text-4xl font-bold text-[var(--accent)] opacity-25 mb-3 tabular-nums leading-none">
                  {s.step}
                </span>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────── */}
      <section className="bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
              Ready to study smarter?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-8 leading-relaxed">
              Start browsing curated semester materials right now — no paywalls, no registration needed.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Browse All Subjects
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] active:scale-[0.98] transition-all"
              >
                College Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}