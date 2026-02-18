import {
  UserIcon,
  TagIcon,
  HashtagIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";

export default function AdminBookCard({ book, onEdit }) {
  const {
    id,
    title,
    authorName,
    imageURL,
    description,
    bookCategory,
    driveLink,
    displayOrder,
    isActive,
  } = book;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">

      <div className="flex flex-1 gap-4 p-5">

        {/* Left: Compact Book Thumbnail */}
        <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
          {imageURL ? (
            <img
              src={imageURL}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400 p-1">
              <span className="text-[9px] font-medium leading-tight">No Cover</span>
            </div>
          )}
        </div>

        {/* Right: Content & Header */}
        <div className="flex flex-1 flex-col">

          {/* Top Row: ID & Status */}
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs font-medium text-gray-400">
              Id: #{id}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide
              ${isActive
                  ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                  : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Title & Author */}
          <div className="mt-2">
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight" title={title}>
              {title}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <UserIcon className="h-3.5 w-3.5" />
              <span className="font-medium line-clamp-1">{authorName || "Unknown Author"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Area */}
      <div className="px-5 pb-3">
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {description || "No description provided."}
        </p>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="mt-auto border-t border-gray-100 bg-gray-50/50 p-4">

        {/* Meta Info Grid */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div>
            <div className="flex items-center gap-1 mt-0.5">
              <TagIcon className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-semibold text-gray-700 truncate" title={bookCategory}>
                {"Category: " + bookCategory?.replace(/_/g, " ")}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mt-0.5">
              <HashtagIcon className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs font-semibold text-gray-700">
                {"Display Order: " + (displayOrder ?? "-")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">

          {/* Open Book Button */}
          <a
            href={driveLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center rounded-lg px-3 py-2 text-xs font-bold transition-all
      ${driveLink
                ? "bg-white-600 text-white hover:bg-gray-300 active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            onClick={(e) => {
              if (!driveLink) e.preventDefault();
            }}
          >
            Open Book
          </a>

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 active:scale-[0.98]"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" />
            Edit
          </button>

        </div>

      </div>
    </div>
  );
}