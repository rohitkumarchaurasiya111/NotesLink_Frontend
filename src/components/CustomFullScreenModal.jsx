import { useEffect, useState } from "react";
import { CloseIcon } from "../components/close-icon";
import PdfLoadingView from "./PdfLoadingView";

// This opens the material using its iframeSrc or renders children in full-screen modal
export const CustomFullScreenModal = ({
  isOpen,
  onClose,
  children,
  iframeSrc,
  closeOnEsc = true,
  closeOnOverlayClick = false,
  title,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // ⌨️ ESC to close
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Start loading when iframe opens
  useEffect(() => {
    if (isOpen && iframeSrc) {
      setIsLoading(true);
    }
  }, [isOpen, iframeSrc]);

  useEffect(() => {
    if (!isOpen) setIsLoading(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {/* 📄 FULL SCREEN VIEWER */}
      <div
        className="fixed inset-0 bg-[var(--bg-base)] text-[var(--text-primary)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔒 MOBILE ONLY — Drive UI blocker */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 z-[55] pointer-events-auto" />

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="z-[80]
              flex items-center justify-center
              bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-lg
              hover:bg-[var(--bg-elevated)]
              active:scale-95
              touch-manipulation
              rounded-full
              transition-all

              /* Mobile */
              fixed top-[env(safe-area-inset-top)] right-[env(safe-area-inset-right)]
              h-14 w-14 m-2

              /* Desktop */
              md:absolute
              md:top-[28px]
              md:right-[20px]
              md:-translate-y-1/2
              md:h-11 md:w-11 md:m-0 cursor-pointer"
        >
          <CloseIcon className="h-6 w-6 text-[var(--text-primary)]" />
        </button>

        {/* 🔒 DESKTOP — Drive pop-out blocker */}
        <div
          className="
            hidden md:block
            absolute
            top-[28px]
            right-[20px]
            -translate-y-1/2
            h-[48px]
            w-[48px]
            z-[55]
            pointer-events-auto
          "
        />

        {/* 🧠 CONTENT */}
        {iframeSrc ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-[70] flex items-center justify-center bg-[var(--bg-base)]">
                <PdfLoadingView
                  title={title}
                  type={type}
                  onClose={onClose}
                />
              </div>
            )}
            <iframe
              src={iframeSrc}
              title="Viewer"
              className="w-screen h-screen border-none"
              allow="fullscreen"
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <div className="w-screen h-screen overflow-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
