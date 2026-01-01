export default function SubjectCard({ subject, onEdit }) {
  return (
    <div className="group relative flex w-full items-start gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">

      {/* 1. THUMBNAIL */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {subject.imageURL ? (
          <img
            src={subject.imageURL}
            alt={subject.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300">
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
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-blue-600 border border-blue-100 uppercase">
                {subject.branch}
              </span>
              <span className="font-mono text-[10px] text-gray-400">
                #{subject.id}
              </span>
            </div>

            {subject.isProject && (
              <span className="flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[9px] font-bold text-purple-600 ring-1 ring-purple-100">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                PROJECT
              </span>
            )}
          </div>

          {/* Subject Name */}
          <h3
            className="line-clamp-1 text-sm font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors"
            title={subject.name}
          >
            {subject.name}
          </h3>

          {/* Description (Added Here) */}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500" title={subject.description}>
            {subject.description || "No description provided."}
          </p>
        </div>

        {/* Bottom Section: College & Edit */}
        <div className="flex items-end justify-between mt-2 pt-2 border-t border-dashed border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 overflow-hidden">
            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate max-w-[120px] font-medium">
              {subject.college_name + ", " + subject.year + " year"}
            </span>
          </div>

          <button
            onClick={onEdit}
            className="group/btn flex items-center gap-1 rounded-md bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-600 transition-all hover:bg-blue-600 hover:text-white hover:shadow-md"
          >
            Edit
            <svg className="h-3 w-3 text-gray-400 transition-colors group-hover/btn:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}