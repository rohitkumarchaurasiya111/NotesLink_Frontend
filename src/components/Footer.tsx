import { useState } from "react";
import { Link } from "react-router-dom";
import { FacebookCircleIcon } from "../icons/facebook-circle-icon";
import { GitHubOctocatIcon } from "../icons/github-octocat-icon";
import { InstagramIcon } from "../icons/instagram-icon";
import { SentIcon } from "../icons/sent-icon";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../assets/NotesLinkFullLogo_Dark.png";
import { useTheme } from "../contexts/ThemeContext";
import { subscribeToNewsLetter } from "../api/userAPI";

const NAV_COLS = [
  {
    title: "Academic Hub",
    links: [
      { label: "Study Notes", href: "/subjects" },
      { label: "Previous Year Papers (PYQs)", href: "/subjects" },
      { label: "Reference Books", href: "/books" },
      { label: "Academic Projects", href: "/projects" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Explore Hub", href: "/explore" },
      { label: "About Us", href: "/aboutus" },
      { label: "Contact Support", href: "/contactus" },
      { label: "College Login", href: "/login" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Contribute Notes", href: "/contactus" },
      { label: "Request Your College", href: "/contactus" },
      { label: "Report Broken Link", href: "/contactus" },
      { label: "Student Guidelines", href: "/aboutus" },
    ],
  },
];

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookCircleIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://github.com", label: "GitHub", Icon: GitHubOctocatIcon },
];

export default function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    try {
      setStatus("loading");
      setStatusMessage("");
      await subscribeToNewsLetter(email.trim());
      setStatus("success");
      setStatusMessage("Subscribed successfully!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      const errorMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response?.data : null) ||
        "Failed to subscribe. Please contact us OR try again later.";
      setStatusMessage(errorMsg);
    }
  };

  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 mb-10">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5">
            <img
              src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
              alt="NotesLink"
              className="h-7 w-auto object-contain"
            />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Your centralized academic hub. Study smarter, not harder.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">Stay updated</p>
              <p className="text-xs text-[var(--text-secondary)] mb-3">
                New notes, PYQs and curriculum updates in your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2"
              >
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="you@gmail.com"
                  required
                  disabled={status === "loading"}
                  className="flex-1 min-w-0 px-3 py-2 text-xs rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)] transition-colors disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex-shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <SentIcon className="w-3.5 h-3.5 stroke-white" />
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {status === "success" && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-2">
                  ✓ {statusMessage}
                </p>
              )}

              {status === "error" && (
                <p className="text-[11px] text-red-500 dark:text-red-400 font-medium mt-2">
                  ✕ {statusMessage}
                </p>
              )}

              {status === "idle" && (
                <p className="text-[10px] text-[var(--text-tertiary)] mt-2">
                  Curated alerts only. No spam.
                </p>
              )}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {NAV_COLS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} NotesLink. Study Smarter, Not Harder.
          </p>
          <div className="flex items-center gap-1">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}