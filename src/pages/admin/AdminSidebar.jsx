import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  FolderIcon,
  AcademicCapIcon,
  DocumentDuplicateIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import NotesLinkFullLogo from "../../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../../assets/NotesLinkFullLogo_Dark.png";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const NAV_ITEMS = [
  { name: "Dashboard",  path: "/admin",           icon: Squares2X2Icon,        end: true },
  { name: "Subjects",   path: "/admin/subjects",  icon: AcademicCapIcon },
  { name: "Materials",  path: "/admin/materials", icon: DocumentDuplicateIcon },
  { name: "Projects",   path: "/admin/projects",  icon: FolderIcon },
  { name: "Books",      path: "/admin/books",     icon: BookOpenIcon },
];

export default function AdminSidebar() {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">

      {/* Brand header */}
      <div className="flex flex-col items-center justify-center border-b border-[var(--border-subtle)] py-6 px-4 gap-2">
        <Link to="/admin" aria-label="Admin Dashboard">
          <img
            src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
            alt="NotesLink"
            className="h-7 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest border border-[var(--accent)]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Admin Console
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
          Manage
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ name, path, icon: Icon, end }) => (
            <li key={name}>
              <NavLink
                to={path}
                end={end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-[var(--accent-light)] text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 transition-colors ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]"
                      }`}
                      aria-hidden="true"
                    />
                    {name}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Preferences & Quick Links */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] space-y-1">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
            Preferences & Links
          </p>

          {/* Theme Toggle Button in Sidebar */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
          >
            <span className="flex items-center gap-3">
              {isDark ? (
                <SunIcon className="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45" />
              ) : (
                <MoonIcon className="w-5 h-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-transform group-hover:-rotate-12" />
              )}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
              {isDark ? "Dark" : "Light"}
            </span>
          </button>

          {/* View Public Site */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[var(--text-tertiary)]">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Public Site
          </Link>
        </div>
      </nav>

      {/* Footer: user + logout */}
      <div className="border-t border-[var(--border-subtle)] p-3">
        <div className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-[var(--bg-elevated)] transition-colors">
          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 select-none">
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{user?.name ?? "Admin"}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] truncate">{user?.email ?? ""}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}