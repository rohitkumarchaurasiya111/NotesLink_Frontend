import { useMemo, useState, useDeferredValue } from "react";
import AdminProjectCard from "./AdminProjectCard";

export default function AdminProjectList({
    projects,
    setSelectedProject,
}) {
    const [search, setSearch] = useState("");

    // ⏳ Defer the search value (prevents heavy re-rendering while typing)
    const deferredSearch = useDeferredValue(search);

    // 🔍 Filtered projects (memoized for performance)
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
        <div className="w-full">

            {/* Header Section */}
            {/* UI UPDATE: Improved alignment and added a styled search bar with icon */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Project List
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                </div>

                {/* 🔍 Search Input */}
                <div className="relative w-full sm:max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects..."
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Grid Layout */}
            {/* UI UPDATE: Standardized grid gap and columns for admin readability */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {filteredProjects.map((project) => (
                        <AdminProjectCard
                            key={project.id}
                            project={project}
                            onEdit={() => {
                                setSelectedProject(project);
                            }}
                        />
                    ))}
                </div>
            ) : projects.length > 0 ? (
                /* 🔍 No search results */
                /* UI UPDATE: Added icon and better centering */
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-3">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">No matching projects</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        No projects match your search query "{search}".
                    </p>
                </div>
            ) : (
                /* 📭 No projects at all */
                /* UI UPDATE: Added illustration icon for empty state */
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                    <div className="mb-4 rounded-full bg-blue-50 p-3">
                        <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">No projects added yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by adding a new project using the form above.
                    </p>
                </div>
            )}
        </div>
    );
}