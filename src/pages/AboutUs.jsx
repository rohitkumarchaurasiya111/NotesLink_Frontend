import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  DocumentTextIcon,
  CommandLineIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { GitHubOctocatIcon } from "../icons/github-octocat-icon";

const STATS = [
  {
    value: "1,200+",
    label: "Curated Modules",
    description: "Verified semester notes & formula sheets",
    badge: "Active",
  },
  {
    value: "5+ Years",
    label: "Exam PYQ Archive",
    description: "Question papers with repeated trends",
    badge: "Updated",
  },
  {
    value: "100%",
    label: "Open & Ad-Free",
    description: "Zero paywalls or locked document tiers",
    badge: "Forever",
  },
  {
    value: "< 24h",
    label: "Curation Cycle",
    description: "Turnaround for student-submitted notes",
    badge: "Rapid",
  },
];

const PILLARS = [
  {
    id: "notes",
    title: "Curated Study Notes",
    subtitle: "Module-Wise Lecture Notes",
    icon: DocumentTextIcon,
    description:
      "Structured unit-by-unit lecture notes, derivation summaries, and formula cheat sheets crafted by top-performing students and verified by faculty.",
    highlights: [
      "Aligned with official autonomous & state university syllabi",
      "High-yield summaries for quick night-before-exam revision",
      "Clean, high-contrast digital scans without intrusive watermarks",
    ],
    actionText: "Browse Subjects",
    actionLink: "/subjects",
    meta: "Updated for Current 2024-2026 Regulations",
  },
  {
    id: "pyqs",
    title: "Previous Year Question Papers",
    subtitle: "PYQs with Exam Trends",
    icon: BookOpenIcon,
    description:
      "Past 5 to 7 years of mid-term and end-semester university papers indexed by course code, helping you identify high-frequency recurring questions.",
    highlights: [
      "Sorted by semester, university scheme, and branch",
      "Covers both internal assessments and final board examinations",
      "Includes question frequency patterns and unit weightage",
    ],
    actionText: "Explore Question Papers",
    actionLink: "/subjects",
    meta: "Over 800+ Verified Examination Papers",
  },
  {
    id: "books",
    title: "University Reference Books",
    subtitle: "Recommended Reading & Authors",
    icon: BuildingLibraryIcon,
    description:
      "Direct access to standard university-prescribed textbooks, standard reference works, and solution manuals recommended by syllabus committees.",
    highlights: [
      "Standard international & Indian author editions",
      "Chapter references linked to specific syllabus units",
      "Legal open educational references and curated links",
    ],
    actionText: "Browse Book Directory",
    actionLink: "/books",
    meta: "Prescribed University Curricula",
  },
  {
    id: "projects",
    title: "Academic Capstone Projects",
    subtitle: "Mini & Major Project Blueprints",
    icon: CommandLineIcon,
    description:
      "Comprehensive blueprints for minor and major capstone projects, featuring project documentation templates, architecture diagrams, and viva guides.",
    highlights: [
      "Full-stack web, mobile, ML, IoT, and embedded system projects",
      "Complete IEEE format documentation & synopsis templates",
      "Viva-voce preparation checklists and architecture breakdowns",
    ],
    actionText: "View Project Blueprints",
    actionLink: "/projects",
    meta: "Ready for Semester Project Submissions",
  },
];

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Syllabus Indexing",
    desc: "Every resource is cross-referenced with official university course codes, regulation schemes, and credit structures.",
    tag: "Cataloging",
  },
  {
    step: "02",
    title: "Peer & Topper Review",
    desc: "Student curators review notes for completeness, mathematical correctness, legible handwriting, and key formula highlights.",
    tag: "Quality Audit",
  },
  {
    step: "03",
    title: "Digital Optimization",
    desc: "Raw documents undergo OCR scanning, orientation alignment, and compression for lightning-fast mobile downloading.",
    tag: "OCR Processing",
  },
  {
    step: "04",
    title: "Community Upkeep",
    desc: "Broken links, outdated syllabi, or missing topics reported by students are corrected within 24 hours.",
    tag: "Continuous Sync",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Rohit Kumar Chaurasiya",
    role: "Founder & Full-Stack Architect",
    specialty: "Core Systems • Cloud Architecture • Database Reliability",
    bio: "Built NotesLink after experiencing the chaos of unindexed WhatsApp study groups during engineering finals. Focused on scalable educational infrastructure.",
    github: "https://github.com/rohit-chaurasiya",
    badge: "Maintainer",
  },
  {
    name: "Arya Karn",
    role: "Frontend Engineer & UI/UX",
    specialty: "Interface Architecture • Design Systems • Accessibility",
    bio: "Crafting fast, distraction-free study workflows for students on mobile and low-bandwidth connections. Champion of accessible web design.",
    github: "https://github.com",
    badge: "Core Contributor",
  },
  {
    name: "Student Curator Network",
    role: "Campus Leads & Contributors",
    specialty: "Syllabus Verification • PYQ Collection • Local Notes",
    bio: "A growing network of high-achieving student leads across participating engineering campuses who upload and verify local university curriculum materials.",
    github: "https://github.com",
    badge: "Community",
  },
];

const ETHICS = [
  {
    title: "Always 100% Free for Students",
    desc: "Education shouldn't be trapped behind paywalls, subscription models, or locked document viewers. Every resource is open.",
  },
  {
    title: "Zero Adware & Spam Redirects",
    desc: "No timer countdowns, pop-ups, or shady file locker redirects. NotesLink provides clean, direct, instant in-browser access.",
  },
  {
    title: "Credit & Intellectual Attribution",
    desc: "We honor student authors and educators by highlighting contributor credits on materials while upholding fair educational use.",
  },
];

export default function AboutUs() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] w-full">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] overflow-hidden">
        {/* Subtle decorative background gradient mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[var(--accent-light)] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-light)] border border-[var(--accent-muted)] mb-6">
              <SparklesIcon className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Academic Infrastructure • Free Open Access
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
              Built to eliminate <span className="text-[var(--accent)]">end-semester chaos</span>.
            </h1>

            {/* Realistic Student Pain Point Narrative */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Every semester, thousands of engineering students waste hours digging through messy WhatsApp chats,
              broken Google Drive links, and incomplete photocopies the night before exams.
              <br className="hidden sm:inline" /> NotesLink organizes university curricula into an indexed,
              verified, and instantly accessible academic repository.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all shadow-[var(--shadow-sm)]"
              >
                Browse Curriculum Materials
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/contactus"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] active:scale-[0.98] transition-all"
              >
                Contribute Notes to NotesLink
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Metric Strip ─────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 sm:p-6 shadow-[var(--shadow-sm)] hover:border-[var(--border-default)] transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--accent)] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent)]">
                  {stat.badge}
                </span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{stat.label}</h2>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bento: The Fractured Way vs. NotesLink ────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
            The Reality Check
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Why traditional exam preparation is broken
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            The standard student workflow before exams is fragmented, stressful, and unreliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* The Fractured Way */}
          <div className="bg-[var(--bg-surface)] border border-red-200/60 dark:border-red-900/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold mb-5">
                <XCircleIcon className="w-4 h-4" />
                The Fractured Student Reality
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Searching 5 platforms at 2:00 AM
              </h3>
              <ul className="space-y-3.5 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Scattered WhatsApp Drive links:</strong> Files named
                    &ldquo;IMG_0492.pdf&rdquo; with missing units and broken permission access.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Outdated Syllabus Drift:</strong> Studying topics
                    removed from the university scheme three years ago.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Commercial File Lockers:</strong> Timer count-downs,
                    spam popups, and paywalled PDF unlockers.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Missing PYQ Solutions:</strong> Questions without
                    marking schemes or repeated pattern indicators.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] text-xs text-[var(--text-tertiary)] italic">
              Result: Lost study hours, high pre-exam anxiety, and inconsistent preparation.
            </div>
          </div>

          {/* The NotesLink Standard */}
          <div className="bg-[var(--bg-surface)] border border-[var(--accent)]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[var(--shadow-sm)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-light)] rounded-bl-full pointer-events-none opacity-50" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] text-xs font-semibold mb-5">
                <CheckCircleIcon className="w-4 h-4" />
                The NotesLink Standard
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Unified, syllabus-mapped academic archive
              </h3>
              <ul className="space-y-3.5 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Direct Scheme Indexing:</strong> Select your
                    college, year, and branch to access only what is on your official exam syllabus.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Curated Unit Breakdowns:</strong> Module-wise
                    lecture notes, derivation formulas, and short-answer summaries.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">Pure In-Browser Reading:</strong> Zero spam, no
                    wait timers, no subscriptions. Download or view with one click.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--text-primary)]">5-Year Trend Papers:</strong> Real question papers
                    compiled to spotlight frequent long and short questions.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--accent)]">
                Designed for speed & clarity
              </span>
              <span className="text-xs text-[var(--text-tertiary)]">100% Free Open Education</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Academic Pillars Showcase ─────────── */}
      <section className="bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
              Academic Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Four pillars of semester excellence
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Everything required to go from day one of classes to acing the final viva examination.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--bg-surface)] border-[var(--accent)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]"
                      : "bg-[var(--bg-surface)]/60 border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-semibold truncate">{pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {(() => {
            const current = PILLARS[activePillar];
            const CurrentIcon = current.icon;
            return (
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-10 shadow-[var(--shadow-sm)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--accent-light)] text-[var(--accent)] text-xs font-semibold">
                      <CurrentIcon className="w-4 h-4" />
                      {current.meta}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      {current.subtitle}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {current.description}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {current.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                          <CheckCircleIcon className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        to={current.actionLink}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity"
                      >
                        {current.actionText}
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl p-6 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Platform Assurance
                    </span>
                    <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                      How we protect academic quality
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                      NotesLink works alongside top class rankers and university mentors to ensure every
                      uploaded syllabus unit mirrors actual examination requirements.
                    </p>
                    <div className="space-y-2 border-t border-[var(--border-subtle)] pt-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Verification Status</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Peer Reviewed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Access Freedom</span>
                        <span className="text-[var(--accent)] font-semibold">Instant Download</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Document Format</span>
                        <span className="text-[var(--text-primary)] font-medium">Standard PDF / OCR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─── Curation & Verification Pipeline ─────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
            Quality Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Our 4-stage curation pipeline
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            We don't do random unorganized file dumps. Every single material goes through rigorous validation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PIPELINE_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 relative flex flex-col justify-between hover:border-[var(--border-default)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-[var(--accent)] opacity-30 tabular-nums">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-1.5 text-[11px] text-[var(--accent)] font-medium">
                <CheckCircleIcon className="w-3.5 h-3.5" />
                Verified Standard
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team & Creators ──────────────────────────────── */}
      <section className="bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
              The People Behind The Project
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Built by students, for students
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              NotesLink is developed and maintained by active engineering students and open-source contributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--border-default)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] font-bold text-base flex items-center justify-center border border-[var(--accent-muted)]">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                      {member.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-0.5">{member.name}</h3>
                  <p className="text-xs font-semibold text-[var(--accent)] mb-2">{member.role}</p>
                  <p className="text-[11px] font-mono text-[var(--text-tertiary)] mb-3 pb-2 border-b border-[var(--border-subtle)]">
                    {member.specialty}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{member.bio}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <GitHubOctocatIcon className="w-4 h-4" />
                    GitHub Profile
                  </a>
                  <span className="text-[10px] text-[var(--text-tertiary)]">Core Team</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Non-Negotiable Ethics / Governance ───────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] block mb-2">
              Our Core Principles
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              The NotesLink Non-Negotiables
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              We started NotesLink to solve a genuine problem in Indian higher education. We stay grounded in our core principles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ETHICS.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Call To Action ───────────────────────────────── */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Start studying with verified clarity
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
            Pick your college branch, choose your semester, and access complete module notes and question papers right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all shadow-[var(--shadow-sm)]"
            >
              Access All Subjects
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              to="/contactus"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] active:scale-[0.98] transition-all"
            >
              Get In Touch with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}