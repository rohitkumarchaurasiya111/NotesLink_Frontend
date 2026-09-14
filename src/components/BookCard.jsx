export default function BookCard({ book }) {
  const { title, authorName, description, imageURL, driveLink, bookCategory } = book;

  return (
    <div
      onClick={() => window.open(driveLink, "_blank", "noopener,noreferrer")}
      className="group cursor-pointer flex flex-col h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
    >
      {/* Cover image */}
      <div className="relative h-48 bg-[var(--bg-elevated)] overflow-hidden flex-shrink-0">
        <img
          src={imageURL || "https://res.cloudinary.com/dfdusmc9k/image/upload/Book_Cover_Image_c97hus.png"}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        {bookCategory && (
          <span className="inline-block mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-light)] px-2 py-0.5 rounded-md w-fit">
            {bookCategory.replace("_", " ")}
          </span>
        )}

        <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2 leading-snug mb-1 group-hover:text-[var(--accent)] transition-colors duration-150">
          {title}
        </h3>

        {authorName && (
          <p className="text-xs text-[var(--text-secondary)] mb-2">
            by {authorName}
          </p>
        )}

        {description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed flex-1">
            {description}
          </p>
        )}

        {/* CTA */}
        <div className="pt-3 mt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--accent)]">Read now</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[var(--accent)] transition-transform duration-150 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}