import { useEffect, useState } from "react";
import { CloseIcon } from "../components/close-icon";
import Loader from "../components/Loader";

//This opens the material using it's iframeSrc
export const CustomFullScreenModal = ({
  isOpen,
  onClose,
  children,       //If iframeSrc is not given then this will be rendered
  iframeSrc,
  closeOnEsc = true,
  closeOnOverlayClick = false,
}) => {

  const [isLoading, setIsLoading] = useState(false);        //To show the Loading state

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
    // ✅ Escape all layouts
    <div className="fixed inset-0 z-[9999] bg-black/70"
      onClick={closeOnOverlayClick ? onClose : undefined}   // //This is attached to the background overlay (the dark area), clicking on the overlay closes the modal
    >

      {/* 📄 FULL SCREEN VIEWER */}
      <div className="fixed inset-0 bg-white relative"
        onClick={(e) => e.stopPropagation()}          //Prevents the click event from bubbling up, Stops the overlay’s onClick from firing
      >

        {/* 🔒 MOBILE ONLY — Drive UI blocker */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 z-[55] pointer-events-auto" />

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="z-[80]
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


        {/* 🧠 CONTENT */}
        {/* IFRAME — TRUE FULL SCREEN, only if iframeSrc is given*/}
        {iframeSrc ? (
          <>
            {/* Loader overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-[70] flex items-center justify-center bg-white">
                <Loader size="lg" message="Loading material..." />
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
          <div className="w-screen h-screen overflow-auto p-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
