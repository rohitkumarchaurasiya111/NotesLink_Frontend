import { useEffect, useState } from "react";
import NotesLinkIcon from "../assets/NotesLinkIcon.png";

const LOADING_STEPS = [
  "Connecting to secure document storage...",
  "Decrypting academic resource...",
  "Rendering PDF pages...",
  "Finalizing document view...",
];

export default function PdfLoadingView({ title = "Study Material", type, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-12 bg-[var(--bg-base)] text-[var(--text-primary)] select-none overflow-hidden animate-fade-in-up">
      {/* Background Ambient Glow */}
      <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[var(--accent)]/10 dark:bg-[var(--accent)]/15 blur-3xl pointer-events-none -top-10 animate-pulse" />
      <div className="absolute w-72 h-72 rounded-full bg-rose-500/5 blur-3xl pointer-events-none -bottom-10" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">

        {/* 📄 Animated PDF Document Metaphor */}
        <div className="relative mb-8 group">
          {/* Back Paper Layer (Stacked Page Effect) */}
          <div className="absolute -top-2.5 -right-2.5 w-48 sm:w-56 h-64 sm:h-72 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rotate-3 opacity-60 transition-transform" />
          <div className="absolute -top-1 -left-2 w-48 sm:w-56 h-64 sm:h-72 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] -rotate-2 opacity-80 transition-transform" />

          {/* Foreground Main Paper Sheet */}
          <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl p-4 sm:p-5 overflow-hidden flex flex-col justify-between">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-[var(--accent)] to-blue-600" />

            {/* Glowing Laser Scanline Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent nl-scan pointer-events-none shadow-[0_0_12px_var(--accent)] z-20" />

            {/* Document Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-bold tracking-wider uppercase">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1h2c.6 0 1-.4 1-1s-.4-1-1-1zm6 2h-1.5v-3H14v1h1.5v1H14v1h1.5zm-3-4h-2v5h1.5v-1.5h.5c.8 0 1.5-.7 1.5-1.5v-.5c0-.8-.7-1.5-1.5-1.5zm0 2h-.5v-1h.5c.3 0 .5.2.5.5s-.2.5-.5.5z" />
                  </svg>
                  PDF
                </span>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  {type ? type.replace(/_/g, " ") : "NOTES"}
                </span>
              </div>

              {/* Simulated Skeleton Lines on Page */}
              <div className="mt-4 space-y-2.5">
                <div className="h-3 w-3/4 rounded bg-[var(--bg-elevated)] nl-skeleton" />
                <div className="h-2 w-full rounded bg-[var(--bg-elevated)] nl-skeleton" />
                <div className="h-2 w-5/6 rounded bg-[var(--bg-elevated)] nl-skeleton" />
                <div className="h-2 w-4/6 rounded bg-[var(--bg-elevated)] nl-skeleton" />
              </div>

              {/* Simulated Diagram / Table Box on Page */}
              <div className="mt-4 rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-2.5 flex items-center justify-center">
                <div className="space-y-1.5 w-full">
                  <div className="h-1.5 w-1/2 rounded bg-[var(--bg-muted)]" />
                  <div className="h-1.5 w-full rounded bg-[var(--bg-muted)]" />
                  <div className="h-1.5 w-3/4 rounded bg-[var(--bg-muted)]" />
                </div>
              </div>
            </div>

            {/* Document Bottom Footer */}
            <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img
                  src={NotesLinkIcon}
                  alt="NotesLink"
                  className="w-3.5 h-3.5 opacity-60 object-contain"
                />
                <span className="text-[9px] font-semibold text-[var(--text-tertiary)]">
                  NotesLink
                </span>
              </div>
              <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
                Page 1
              </span>
            </div>
          </div>
        </div>

        {/* 🏷️ Title & Details */}
        <h2
          className="text-base sm:text-lg font-bold text-[var(--text-primary)] line-clamp-1 max-w-sm px-2 tracking-tight"
          title={title}
        >
          {title || "Opening Academic Document"}
        </h2>

        {/* Dynamic Status Stepper Message */}
        <p className="mt-1.5 text-xs text-[var(--accent)] font-medium transition-all duration-300 min-h-[1.25rem]">
          {LOADING_STEPS[stepIndex]}
        </p>

        {/* ⏳ Apple-style Progress Track */}
        <div className="mt-5 w-48 sm:w-60 h-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden relative">
          <div className="absolute inset-y-0 w-2/5 rounded-full bg-gradient-to-r from-rose-500 via-[var(--accent)] to-blue-500 nl-progress shadow-[0_0_8px_var(--accent)]" />
        </div>

        {/* Footer Hints */}
        <p className="mt-6 text-[11px] text-[var(--text-tertiary)]">
          Preparing high-resolution document viewer • Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-[10px]">Esc</kbd> to exit
        </p>

        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="mt-3 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
