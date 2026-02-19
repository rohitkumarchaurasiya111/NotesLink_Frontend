import { useContext, useState } from "react";
import axios from "axios";
import { StarIcon } from "../icons/star-icon";
import { CustomFullScreenModal } from "./CustomFullScreenModal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { decryptLink } from "../util/decrypt";
import { AuthContext } from "../contexts/AuthContext";
import { UserRole } from "../constants/UserRole";

// Displays the Material in card format
export default function ListCard({ item, editMode, onSelectMaterial }) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const openMaterial = () => {
    setPreviewUrl(item.driveLink);
    setOpen(true);
  };

  const getPremium = () => {
    navigate("/premium");
  };

  return (
    <>
      <div
        key={item.id}
        className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        {/* ⭐ Premium Icon */}
        {item.isPremium && (
          <StarIcon
            className="absolute right-4 top-4 h-5 w-5 text-yellow-500"
            title="Premium"
          />
        )}

        {/* Show Display Order, Only in the case of Edit Mode */}
        {
          editMode && (
            <span className="font-mono text-[11px] text-gray-700">
              Display Order: {item.displayOrder}
            </span>
          )
        }

        {/* Card Content */}
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
          {item.title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {item.type}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {
            (user.role != UserRole.PREMIUM && item.isPremium) ? (
              <button
                onClick={() => getPremium()}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Get Premium →
              </button>
            ) : (
              <button
                onClick={() => openMaterial()}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Open Material →
              </button>
            )

          }


          {item.isPremium && (
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              Premium
            </span>
          )}

          {editMode && (
            <button
              onClick={() => onSelectMaterial(item)}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Modal - which opens this specific material using it's PreviewURL */}
      <CustomFullScreenModal
        isOpen={open}
        onClose={() => setOpen(false)}
        iframeSrc={decryptLink(previewUrl)}
      >
        <h1>Error: <NavLink to="/contactus"><u>Contact Admin</u></NavLink></h1>
      </CustomFullScreenModal>
    </>
  );
}
