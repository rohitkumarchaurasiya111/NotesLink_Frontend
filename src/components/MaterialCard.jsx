import { useState } from "react";
import axios from "axios";
import { StarIcon } from "../icons/star-icon";
import MaterialViewerModal from "./MaterialViewerModal";

// Displays the Material in card format
export default function ListCard({ item }) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const openMaterial = () => {
    setPreviewUrl(item.driveLink); 
    setOpen(true);
  };

  console.log(item);
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

        {/* Card Content */}
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
          {item.title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {item.type}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {console.log(item)}
          <button
            onClick={() => openMaterial()}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Open Material →
          </button>

          {item.isPremium && (
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              Premium
            </span>
          )}
        </div>
      </div>

      {/* Modal - which opens this specific material using it's PreviewURL */}
      <MaterialViewerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        previewUrl={previewUrl}
      />

    </>
  );
}
