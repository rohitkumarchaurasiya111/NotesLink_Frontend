import React from "react";
import { useRouteError, isRouteErrorResponse, Link, useNavigate } from "react-router-dom";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import NotesLinkFullLogoDark from "../assets/NotesLinkFullLogo_Dark.png";
import { useTheme } from "../contexts/ThemeContext";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  let statusCode = 404;
  let title = "Page Not Found";
  let description = "Sorry, the page or study repository you are looking for does not exist or has been moved.";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Page Not Found";
      description = "We couldn't find the syllabus, note, or page you were looking for.";
    } else if (error.status === 401) {
      title = "Unauthorized Access";
      description = "You need an authorized college account to view this resource.";
    } else if (error.status === 503) {
      title = "Service Unavailable";
      description = "Our servers are experiencing heavy traffic. Please try again shortly.";
    } else {
      title = error.statusText || "Unexpected Error";
      description = error.data?.message || "Something went wrong while processing your request.";
    }
  } else if (error instanceof Error) {
    statusCode = 500;
    title = "Application Error";
    description = error.message || "An unexpected error occurred. Please refresh or return to safety.";
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col justify-center items-center px-6 py-12 text-[var(--text-primary)] font-sans">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={isDark ? NotesLinkFullLogoDark : NotesLinkFullLogo}
            alt="NotesLink Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Status Code */}
        <div className="relative inline-block mb-4">
          <span className="text-8xl sm:text-9xl font-extrabold text-[var(--border-subtle)] tracking-tight select-none">
            {statusCode}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black text-[var(--accent)]">
              {statusCode}
            </span>
          </div>
        </div>

        {/* Details */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
          {description}
        </p>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            ← Go Back
          </button>
          
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            Back to Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-xs text-[var(--text-tertiary)] mt-10">
          Need help?{" "}
          <Link to="/contactus" className="text-[var(--accent)] font-medium hover:underline">
            Contact Support Desk
          </Link>
        </p>
      </div>
    </div>
  );
}