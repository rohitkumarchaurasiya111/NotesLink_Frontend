import { Link } from "react-router-dom";
import {
  CalculatorIcon,
  CodeBracketSquareIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  BeakerIcon,
  SparklesIcon,
  ArrowRightIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const POPULAR_PROJECTS = [
  {
    id: "sgpa",
    label: "SGPA & CGPA Calculator",
    desc: "Calculate semester grades, target GPA & percentage",
    href: "/explore#sgpa-calculator",
    badge: "Popular",
    badgeColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/40",
    icon: CalculatorIcon,
  },
  {
    id: "dsa",
    label: "DSA Practice Sheet & Roadmap",
    desc: "Curated 150+ coding problems, topic checklist & tracker",
    href: "/explore#dsa-sheet",
    badge: "Placement",
    badgeColor: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
    icon: CodeBracketSquareIcon,
  },
  {
    id: "attendance",
    label: "75% Attendance & Bunk Planner",
    desc: "Calculate safe bunks & classes needed to clear criteria",
    href: "/explore#attendance-planner",
    badge: "Essential",
    badgeColor: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
    icon: CalendarDaysIcon,
  },
  {
    id: "resume",
    label: "ATS Tech Resume Builder",
    desc: "Single-page engineering format with LaTeX & PDF export",
    href: "/explore#resume-builder",
    badge: "New",
    badgeColor: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/40",
    icon: DocumentTextIcon,
  },
];

const MORE_TOOLS = [
  { label: "Lab Manuals & Code Vault", href: "/explore#lab-vault", icon: BeakerIcon },
  { label: "Technical Viva & Oral Prep", href: "/explore#viva-prep", icon: SparklesIcon },
];

export default function ExploreMenu({ onClose }) {
  return (
    <div className="nl-dropdown glass-panel rounded-2xl shadow-[var(--shadow-lg)] border border-[var(--border-subtle)] overflow-hidden w-[460px] sm:w-[480px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
        <div className="flex items-center gap-2">
          <FireIcon className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            NotesLink Ecosystem Products
          </span>
        </div>
        <Link
          to="/explore"
          onClick={onClose}
          className="text-xs font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity inline-flex items-center gap-1"
        >
          <span>All Tools Hub</span>
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>

      {/* Popular Projects List */}
      <div className="p-2 space-y-1 bg-[var(--bg-surface)]">
        {POPULAR_PROJECTS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={onClose}
              className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-[var(--bg-elevated)] transition-all duration-150 border border-transparent hover:border-[var(--border-subtle)]"
            >
              <div className="mt-0.5 w-9 h-9 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-150 shadow-[var(--shadow-xs)]">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
                    {item.label}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor} flex-shrink-0`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-snug truncate">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Secondary quick items strip */}
      <div className="px-3 py-2 bg-[var(--bg-elevated)]/60 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
        {MORE_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.label}
              to={tool.href}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium truncate"
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[var(--text-tertiary)]" />
              <span className="truncate">{tool.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
        <p className="text-xs text-[var(--text-secondary)]">
          Free student utilities • Zero ads
        </p>
        <Link
          to="/explore"
          onClick={onClose}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all shadow-[var(--shadow-xs)] inline-flex items-center gap-1.5"
        >
          Explore All Products
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
