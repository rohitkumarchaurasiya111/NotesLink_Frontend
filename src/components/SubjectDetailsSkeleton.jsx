export default function SubjectDetailsSkeleton() {
  return (
    <div className="bg-[var(--bg-base)] min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-4 w-20 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
          <span className="text-[var(--text-tertiary)]">/</span>
          <div className="h-4 w-16 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
          <span className="text-[var(--text-tertiary)]">/</span>
          <div className="h-4 w-32 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
        </div>

        {/* Subject Header Grid */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10 mb-10">
          {/* Image Skeleton */}
          <div className="lg:col-span-1 mb-6 lg:mb-0">
            <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)] aspect-[4/3] nl-skeleton flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[var(--text-tertiary)] opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Info Details Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <div className="h-8 sm:h-9 w-3/4 rounded-xl bg-[var(--bg-elevated)] nl-skeleton" />

            {/* Description lines */}
            <div className="space-y-2 pt-1">
              <div className="h-4 w-full rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
              <div className="h-4 w-5/6 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
              <div className="h-4 w-2/3 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
            </div>

            {/* Highlights Box Skeleton */}
            <div className="mt-6 pt-4 space-y-3">
              <div className="h-4 w-24 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
              <div className="space-y-2 pl-4">
                <div className="h-3.5 w-4/5 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
                <div className="h-3.5 w-3/4 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
                <div className="h-3.5 w-2/3 rounded-md bg-[var(--bg-elevated)] nl-skeleton" />
              </div>
            </div>

            {/* Quote Card Skeleton */}
            <div className="mt-6 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 nl-skeleton space-y-2">
              <div className="h-3.5 w-full rounded bg-[var(--bg-muted)]" />
              <div className="h-3.5 w-1/2 rounded bg-[var(--bg-muted)]" />
            </div>
          </div>
        </div>

        {/* Study Materials Section Skeleton */}
        <div className="border-t border-[var(--border-subtle)] pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-36 rounded-lg bg-[var(--bg-elevated)] nl-skeleton" />
            <div className="h-6 w-20 rounded-full bg-[var(--bg-elevated)] nl-skeleton" />
          </div>

          {/* Material Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 space-y-4 nl-skeleton"
              >
                <div className="flex items-center justify-between">
                  <div className="h-3.5 w-16 rounded bg-[var(--bg-elevated)]" />
                  <div className="h-4 w-14 rounded-full bg-[var(--bg-elevated)]" />
                </div>
                <div className="space-y-2 py-1">
                  <div className="h-4 w-5/6 rounded bg-[var(--bg-elevated)]" />
                  <div className="h-4 w-1/2 rounded bg-[var(--bg-elevated)]" />
                </div>
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="h-3.5 w-24 rounded bg-[var(--bg-elevated)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
