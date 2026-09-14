export default function AdminSubjectCard({ subject, onEdit }) {
  return (
    <div className="group relative flex w-full items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-md">

      {/* 1. THUMBNAIL */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        {subject.imageURL ? (
          <img
            src={subject.imageURL}
            alt={subject.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--text-tertiary)]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex min-h-[6rem] flex-1 flex-col justify-between">

        {/* Top Section */}
        <div>
          {/* Badges Row */}
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--accent-light)] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--accent)] border border-[var(--accent)]/20 uppercase">
                {subject.branch}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-tertiary)]">
                #{subject.id}
              </span>
            </div>

            {subject.isProject && (
              <span className="flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                PROJECT
              </span>
            )}
          </div>

          {/* Subject Name */}
          <h3
            className="line-clamp-1 text-sm font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors"
            title={subject.name}
          >
            {subject.name}
          </h3>

          {/* Description */}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]" title={subject.description}>
            {subject.description || "No description provided."}
          </p>
        </div>

        {/* Bottom Section: College & Edit */}
        <div className="flex items-end justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] overflow-hidden">
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate max-w-[140px] font-medium">
              {subject.college_name ? `${subject.college_name}, ${subject.year} year` : `${subject.year} year`}
            </span>
          </div>

          <button
            onClick={onEdit}
            className="group/btn flex items-center gap-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white"
          >
            <span>Edit</span>
            <svg className="h-3 w-3 text-[var(--text-tertiary)] transition-colors group-hover/btn:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}