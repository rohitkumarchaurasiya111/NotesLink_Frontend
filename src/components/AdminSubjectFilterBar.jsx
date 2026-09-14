function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-[var(--text-tertiary)] pointer-events-none"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AdminSubjectFilterBar({
  colleges,
  years,
  collegeId,
  year,
  onCollegeChange,
  onYearChange,
}) {
  return (
    <div className="w-full rounded-2xl bg-[var(--bg-surface)] p-5 border border-[var(--border-subtle)] shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        {/* Label Section */}
        <div className="flex items-center gap-2 text-[var(--text-secondary)] md:mr-2 md:border-r md:border-[var(--border-subtle)] md:pr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[var(--accent)]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
            Curriculum Filters
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row">

          {/* College Dropdown */}
          <div className="relative w-full sm:flex-1">
            <label htmlFor="college-select" className="sr-only">
              Select College
            </label>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[var(--text-tertiary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            <select
              id="college-select"
              value={collegeId}
              onChange={(e) => onCollegeChange(e.target.value)}
              className="block w-full appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-2.5 pl-10 pr-9 text-sm font-medium text-[var(--text-primary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              <option value="" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Select College</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  {college.name}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronIcon />
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="relative w-full sm:w-48">
            <label htmlFor="year-select" className="sr-only">
              Select Year
            </label>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[var(--text-tertiary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <select
              id="year-select"
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              className="block w-full appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-2.5 pl-10 pr-9 text-sm font-medium text-[var(--text-primary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
            >
              <option value="" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  {y}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronIcon />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
