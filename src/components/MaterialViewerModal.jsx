import { useEffect } from "react";
import { CloseIcon } from "../components/close-icon";

//This opens the material using it's previewURL
const MaterialViewerModal = ({ isOpen, onClose, previewUrl }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // ✅ Escape all layouts
    <div className="fixed inset-0 z-[9999] bg-black/70">

      {/* 📄 FULL SCREEN VIEWER */}
      <div className="fixed inset-0 bg-white relative">

        {/* 🔒 MOBILE ONLY — Drive UI blocker */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 z-[55] pointer-events-auto" />

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="z-[60]
              flex items-center justify-center
              bg-white shadow-md
              hover:bg-gray-100
              active:scale-95
              touch-manipulation
              rounded-full

              /* Mobile */
              fixed top-[env(safe-area-inset-top)] right-[env(safe-area-inset-right)]
              h-16 w-16

              /* Desktop */
              md:absolute
              md:top-[28px]
              md:right-[16px]
              md:-translate-y-1/2
              md:h-12 md:w-12"
        >
          <CloseIcon className="h-8 w-8 text-gray-700" />
        </button>

        {/* 🔒 DESKTOP — exact Drive pop-out blocker */}
        <div
          className="
            hidden md:block
            absolute
            top-[28px]
            right-[16px]
            -translate-y-1/2
            h-[48px]
            w-[48px]
            z-[55]
            pointer-events-auto
          "
        />

        {/* IFRAME — TRUE FULL SCREEN */}
        <iframe
          src={previewUrl}
          title="Material Viewer"
          className="w-screen h-screen border-none"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default MaterialViewerModal;
