import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCollegeDetails } from "../api/userAPI";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { AuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../assets/NotesLinkFullLogo_Dark.png";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading } = useContext(AuthContext);
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirectTo") || "/subjects";

  const [supportedColleges, setSupportedColleges] = useState([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) navigate(redirectPath, { replace: true });
  }, [user, navigate, redirectPath, loading]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingColleges(true);
        const res = await getAllCollegeDetails();
        setSupportedColleges(res.data || []);
      } catch {
        // silent
      } finally {
        setIsLoadingColleges(false);
      }
    })();
  }, []);

  const handleGoogleSuccess = async (googleResponse) => {
    try {
      setError("");
      await login(googleResponse.credential);
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please use your official college email.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-base)]">

      {/* ── Left brand panel ── */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 flex-col justify-center items-center bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-12 lg:p-16">
        <div className="max-w-md w-full">
          <img
            src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
            alt="NotesLink"
            className="h-8 w-auto object-contain mb-10"
          />

          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
            Your academic hub, <br />
            <span className="text-[var(--accent)]">all in one place.</span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10">
            Access curated university notes, semester-wise question banks, standard reference textbooks and capstone projects—organized by your college and branch.
          </p>

          {/* Bullet list */}
          <ul className="space-y-3">
            {[
              "Semester-organized lecture notes",
              "5+ years of past question papers",
              "100% free — no paywalls",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <div className="w-5 h-5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right auth panel ── */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-start justify-center bg-[var(--bg-base)] py-12 px-6 sm:px-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <img
            src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
            alt="NotesLink"
            className="h-7 w-auto object-contain mb-8 md:hidden"
          />

          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">Welcome back</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Sign in with your official college email to continue.
          </p>

          {/* Alert */}
          <div className="flex gap-3 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="8" x2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use your <strong className="font-semibold text-[var(--text-primary)]">official college email</strong> — personal emails (@gmail.com, etc.) won't grant access.
            </p>
          </div>

          {/* Google login */}
          <div className="flex justify-center mb-3">
            <GoogleLoginButton onSuccess={handleGoogleSuccess} />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400 text-center mt-2 mb-1">{error}</p>
          )}

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="px-3 text-xs text-[var(--text-tertiary)] bg-[var(--bg-base)]">Supported colleges</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          {/* Colleges */}
          <div className="max-h-56 overflow-y-auto pr-1">
            {isLoadingColleges ? (
              <div className="flex justify-center py-6">
                <div className="w-6 h-6 rounded-full border-2 border-[var(--border-subtle)] border-t-[var(--accent)] animate-spin" />
              </div>
            ) : supportedColleges.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {supportedColleges.map((college, i) => (
                  <div
                    key={i}
                    title={college.name}
                    className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors min-w-0"
                  >
                    <img
                      src={college.logoURL}
                      alt={college.name}
                      className="h-5 w-5 rounded object-contain border border-[var(--border-subtle)] bg-white flex-shrink-0"
                    />
                    <span className="text-xs font-medium text-[var(--text-primary)] truncate" title={college.name}>
                      {college.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-tertiary)] text-center py-3">
                No colleges listed yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}