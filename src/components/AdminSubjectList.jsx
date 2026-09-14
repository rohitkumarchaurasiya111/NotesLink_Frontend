import { useEffect, useMemo, useState, useDeferredValue } from "react";
import AdminSubjectCard from "./AdminSubjectCard";
import { getSubjectListOfSpecificCollegeAndYear } from "../api/userAPI";
import SearchInput from "./SearchInput";
import Loader from "./Loader";
import { 
  BuildingLibraryIcon, 
  FaceFrownIcon, 
  BookOpenIcon 
} from "@heroicons/react/24/outline";

export default function AdminSubjectList({
  enabled,
  collegeId,
  year,
  setSelectedSubject,
  refreshKey,
  onOpenMaterialModal,
}) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔍 Search State */
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    if (!enabled || !collegeId || !year) return;

    async function getSubjects(collegeId, year) {
      setLoading(true);
      try {
        const response = await getSubjectListOfSpecificCollegeAndYear(collegeId, year);
        setSubjects(response.data || []);
      } catch (error) {
        console.error("Failed to fetch subjects", error);
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    }

    getSubjects(collegeId, year);
  }, [enabled, collegeId, year, refreshKey]);

  /* 🔎 Filtered Subjects (Deferred Search) */
  const filteredSubjects = useMemo(() => {
    if (!deferredSearch.trim()) return subjects;

    const q = deferredSearch.toLowerCase();

    return subjects.filter((s) =>
      s.name?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.branch?.toLowerCase().includes(q)
    );
  }, [subjects, deferredSearch]);

  /* =========================================
     State 1: Waiting for User Selection
     ========================================= */
  if (!enabled) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-12 text-center min-h-[360px]">
        <div className="mb-4 rounded-2xl bg-[var(--accent-light)] p-4">
          <BuildingLibraryIcon className="h-8 w-8 text-[var(--accent)]" />
        </div>
        <h3 className="text-base font-bold text-[var(--text-primary)]">Select Curriculum</h3>
        <p className="mt-1.5 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed">
          Please select a <span className="font-medium text-[var(--text-primary)]">College</span> and <span className="font-medium text-[var(--text-primary)]">Year</span> from the dropdowns above to view and manage subjects.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Subject List</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {loading 
              ? "Fetching data..." 
              : `${filteredSubjects.length} ${filteredSubjects.length === 1 ? 'subject' : 'subjects'} found for this curriculum`
            }
          </p>
        </div>

        {/* 🔍 Search Input */}
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search subjects..."
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <Loader message="Loading Subjects..." />
        </div>
      ) : filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredSubjects.map((s) => (
            <AdminSubjectCard
              key={s.id}
              subject={s}
              onEdit={() => {
                setSelectedSubject(s);
                onOpenMaterialModal?.();
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 text-center shadow-sm">
          <div className="mb-4 rounded-2xl bg-[var(--bg-elevated)] p-3.5">
            {search ? (
              <FaceFrownIcon className="h-6 w-6 text-[var(--text-tertiary)]" />
            ) : (
              <BookOpenIcon className="h-6 w-6 text-[var(--text-tertiary)]" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">
            {search ? "No matches found" : "No subjects added yet"}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm">
            {search 
              ? `No subjects match the query "${search}"`
              : "This curriculum is currently empty. Add a subject above to get started."
            }
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}