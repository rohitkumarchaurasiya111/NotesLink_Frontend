import { useContext, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../assets/NotesLinkFullLogo_Dark.png";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import ExploreMenu from "./ExploreMenu";

/* ── Shared link style helpers ─────────────────────── */
const desktopLink = ({ isActive }) =>
  `inline-flex items-center h-full px-1 text-sm font-medium border-b-2 transition-colors duration-150 ${isActive
    ? "border-[var(--accent)] text-[var(--text-primary)]"
    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
  }`;

const mobileLink = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${isActive
    ? "bg-[var(--accent-light)] text-[var(--accent)]"
    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
  }`;

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/subjects", label: "Subjects" },
  { to: "/books", label: "Books" },
  { to: "/projects", label: "Projects" },
  { to: "/aboutus", label: "About" },
  { to: "/contactus", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreTimeout = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
    setMobileOpen(false);
  };

  /* Hover intent with small delay to prevent accidental close */
  const openExplore = () => {
    clearTimeout(exploreTimeout.current);
    setExploreOpen(true);
  };
  const closeExplore = () => {
    exploreTimeout.current = setTimeout(() => setExploreOpen(false), 120);
  };

  return (
    <>
      <nav className="glass-nav sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Left: hamburger + logo + desktop nav */}
            <div className="flex items-center gap-6">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>

              {/* Logo + optional college logo */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <NavLink to="/" aria-label="NotesLink Home">
                  <img src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo} alt="NotesLink" className="h-7 w-auto object-contain block" />
                </NavLink>
                {user?.collegeLogo && (
                  <>
                    <span className="h-5 w-px bg-[var(--border-subtle)] flex-shrink-0" />
                    <img src={user.collegeLogo} alt="College" className="h-6 w-auto object-contain block" />
                  </>
                )}
              </div>

              {/* Desktop nav */}
              <div className="hidden lg:flex items-center h-14 gap-0.5">
                {NAV_LINKS.map(({ to, label, end }) => (
                  <NavLink key={to} to={to} end={end} className={desktopLink}>
                    <span className="px-2">{label}</span>
                  </NavLink>
                ))}

                {/* Explore — with mega-menu */}
                <div
                  className="relative h-14 flex items-center"
                  onMouseEnter={openExplore}
                  onMouseLeave={closeExplore}
                >
                  <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 h-full px-1 text-sm font-medium border-b-2 transition-colors duration-150 ${isActive || exploreOpen
                        ? "border-[var(--accent)] text-[var(--text-primary)]"
                        : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`
                    }
                  >
                    <span className="px-2">Explore</span>
                    <svg
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`w-3.5 h-3.5 transition-transform duration-200 mr-1 ${exploreOpen ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </NavLink>

                  {/* Mega-menu dropdown */}
                  {exploreOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <ExploreMenu onClose={() => setExploreOpen(false)} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: theme toggle + user */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <div className="w-px h-4 bg-[var(--border-subtle)] mx-1 hidden sm:block" />

              {!user ? (
                <Link
                  to="/login"
                  className="text-sm font-medium px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 select-none">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)] hidden md:block max-w-[120px] truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    title="Sign out"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[520px] border-t border-[var(--border-subtle)]" : "max-h-0"
            }`}
        >
          <div className="px-4 py-3 space-y-0.5 bg-[var(--bg-surface)]">
            {/* User info */}
            {user && (
              <div className="flex items-center gap-3 px-3 py-2.5 mb-2 border-b border-[var(--border-subtle)]">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                </div>
              </div>
            )}

            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={mobileLink} onClick={() => setMobileOpen(false)}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/explore" className={mobileLink} onClick={() => setMobileOpen(false)}>
              Explore
            </NavLink>

            <div className="pt-2 border-t border-[var(--border-subtle)] mt-2">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}