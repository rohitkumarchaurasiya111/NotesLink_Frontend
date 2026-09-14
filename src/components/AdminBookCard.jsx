import {
  UserIcon,
  TagIcon,
  HashtagIcon,
  PencilSquareIcon,
  ArrowTopRightOnSquareIcon,
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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-md">
      <div className="flex flex-1 gap-4 p-5">
        {/* Left: Book Thumbnail */}
        <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-sm">
          {imageURL ? (
            <img
              src={imageURL}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-[var(--text-tertiary)] p-2">
              <span className="text-[10px] font-medium leading-tight">No Cover</span>
            </div>
          )}
        </div>

        {/* Right: Content & Header */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Top Row: ID & Status */}
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs font-medium text-[var(--text-tertiary)]">
                #{id}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Title & Author */}
            <h3
              className="mt-2 text-sm font-bold text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors"
              title={title}
            >
              {title}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <UserIcon className="h-3.5 w-3.5 flex-shrink-0 text-[var(--text-tertiary)]" />
              <span className="font-medium line-clamp-1">{authorName || "Unknown Author"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Area */}
      <div className="px-5 pb-3">
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {description || "No description provided."}
        </p>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
        {/* Meta Info Grid */}
        <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-[var(--text-secondary)] truncate">
            <TagIcon className="h-3.5 w-3.5 text-[var(--accent)] flex-shrink-0" />
            <span className="truncate font-medium" title={bookCategory}>
              {bookCategory?.replace(/_/g, " ")}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <HashtagIcon className="h-3.5 w-3.5 text-[var(--text-tertiary)] flex-shrink-0" />
            <span className="font-medium">
              Order: {displayOrder ?? "-"}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Open Book Link */}
          {driveLink ? (
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)]/40 hover:text-[var(--accent)] active:scale-[0.98]"
            >
              <span>View PDF</span>
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center rounded-xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] px-3 py-2 text-xs font-medium text-[var(--text-tertiary)] cursor-not-allowed">
              No PDF
            </span>
          )}

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] text-white px-3 py-2 text-xs font-semibold transition-all hover:bg-[var(--accent-hover)] active:scale-[0.98]"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}