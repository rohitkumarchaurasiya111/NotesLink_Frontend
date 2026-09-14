import { useContext, useState } from "react";
import { StarIcon } from "../icons/star-icon";
import { CustomFullScreenModal } from "./CustomFullScreenModal";
import { NavLink, useNavigate } from "react-router-dom";
import { decryptLink } from "../util/decrypt";
import { AuthContext } from "../contexts/AuthContext";
import { UserRole } from "../constants/UserRole";

export default function ListCard({ item, editMode, onSelectMaterial }) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const openMaterial = () => {
    setPreviewUrl(item.driveLink);
    setOpen(true);
  };

  const isLocked = user?.role === UserRole.FREE && item.isPremium;

  return (
    <>
      <div className="relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 hover:border-[var(--border-default)] hover:shadow-[var(--shadow-sm)] transition-all duration-200">
        {/* Premium badge */}
        {item.isPremium && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
            <StarIcon className="w-3 h-3 text-amber-500" />
            Premium
          </span>
        )}

        {/* Edit mode order */}
        {editMode && (
          <span className="font-mono text-[10px] text-[var(--text-tertiary)] mb-1">
            Order: {item.displayOrder}
          </span>
        )}

        {/* Type chip */}
        {item.type && (
          <span className="inline-block mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            {item.type}
          </span>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 leading-snug mb-4 pr-14">
          {item.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
          {isLocked ? (
            <button
              onClick={() => navigate("/premium")}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Unlock →
            </button>
          ) : (
            <button
              onClick={openMaterial}
              className="text-xs font-semibold text-[var(--accent)] hover:opacity-75 transition-opacity cursor-pointer"
            >
              Open material →
            </button>
          )}

          {editMode && (
            <button
              onClick={() => onSelectMaterial(item)}
              className="text-xs font-medium text-red-500 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <CustomFullScreenModal
        isOpen={open}
        onClose={() => setOpen(false)}
        iframeSrc={decryptLink(previewUrl)}
        title={item?.title}
        type={item?.type}
      >
        <div className="p-6 text-center">
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Failed to load this document.
          </p>
          <NavLink to="/contactus" className="text-sm font-medium text-[var(--accent)] underline">
            Contact Admin
          </NavLink>
        </div>
      </CustomFullScreenModal>
    </>
  );
}
