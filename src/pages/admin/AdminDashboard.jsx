import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";

export default function AdminDashboard() {
  const { isDark, toggleTheme } = useTheme();

  const cards = [
    {
      title: "Manage Subjects",
      description: "Configure college years, streams, and curriculum branches.",
      link: "/admin/subjects",
      actionText: "Manage Subjects",
      icon: AcademicCapIcon,
    },
    {
      title: "Manage Materials",
      description: "Upload notes, previous year questions, solutions & study guides.",
      link: "/admin/materials",
      actionText: "Manage Materials",
      icon: DocumentDuplicateIcon,
    },
    {
      title: "Manage Projects",
      description: "Organize showcase projects, repositories, and live demos.",
      link: "/admin/projects",
      actionText: "Manage Projects",
      icon: FolderIcon,
    },
    {
      title: "Manage Books",
      description: "Upload and organize reference textbooks and digital library PDFs.",
      link: "/admin/books",
      actionText: "Manage Books",
      icon: BookOpenIcon,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="inline-flex items-center rounded-full bg-[var(--accent-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
              Admin Console
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage your institution's academic content, curriculum, resources, and projects.
          </p>
        </div>

        {/* Whole Clickable Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="group flex items-center gap-2.5 self-start sm:self-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-sm hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elevated)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-[var(--bg-elevated)] group-hover:bg-[var(--accent-light)] transition-colors">
            {isDark ? (
              <SunIcon className="h-3.5 w-3.5 text-amber-500 transition-transform duration-200 group-hover:rotate-45" />
            ) : (
              <MoonIcon className="h-3.5 w-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-transform duration-200 group-hover:-rotate-12" />
            )}
          </div>
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.link}
              to={card.link}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex rounded-xl bg-[var(--accent-light)] p-3 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-[var(--bg-elevated)] p-1 text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--accent)]">
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center text-xs font-semibold text-[var(--accent)]">
                <span>{card.actionText}</span>
                <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
