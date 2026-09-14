import { useMemo, useState, useDeferredValue } from "react";
import AdminProjectCard from "./AdminProjectCard";
import { FolderIcon, FaceFrownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminProjectList({
  projects,
  setSelectedProject,
}) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredProjects = useMemo(() => {
    if (!deferredSearch.trim()) return projects;

    const q = deferredSearch.toLowerCase();

    return projects.filter((project) =>
      project.name?.toLowerCase().includes(q) ||
      project.description?.toLowerCase().includes(q) ||
      project.techStacksUsed?.toLowerCase().includes(q) ||
      project.difficultyLevel?.toLowerCase().includes(q)
    );
  }, [projects, deferredSearch]);

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Project List
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Showing <span className="font-semibold text-[var(--text-primary)]">{filteredProjects.length}</span> of <span className="font-semibold text-[var(--text-primary)]">{projects.length}</span> total projects
          </p>
        </div>

        {/* 🔍 Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <MagnifyingGlassIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, tech..."
            className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-2.5 pl-10 pr-3.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Grid Layout */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              onEdit={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : projects.length > 0 ? (
        /* 🔍 No search results */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 text-center shadow-sm">
          <div className="mb-4 rounded-2xl bg-[var(--bg-elevated)] p-3.5">
            <FaceFrownIcon className="h-6 w-6 text-[var(--text-tertiary)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">No matching projects</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm">
            No projects match your search query “<span className="font-semibold text-[var(--text-primary)]">{search}</span>”.
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            Clear search filter
          </button>
        </div>
      ) : (
        /* 📭 No projects at all */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 text-center">
          <div className="mb-4 rounded-2xl bg-[var(--accent-light)] p-4">
            <FolderIcon className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">No projects added yet</h3>
          <p className="mt-1.5 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed">
            Get started by adding student and showcase projects using the form above.
          </p>
        </div>
      )}
    </div>
  );
}