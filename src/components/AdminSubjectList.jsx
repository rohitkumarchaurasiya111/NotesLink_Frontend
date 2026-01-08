import { useEffect, useMemo, useState, useDeferredValue } from "react";
import AdminSubjectCard from "./AdminSubjectCard";
import { getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";
import SearchInput from "./SearchInput";
import Loader from "./Loader"; // Reusing your Loader component
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
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center min-h-[400px]">
                <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-200">
                    <BuildingLibraryIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Select Curriculum</h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Please select a <span className="font-medium text-gray-700">College</span> and <span className="font-medium text-gray-700">Year</span> from the dropdowns above to view the subject list.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Subject List</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {loading 
                            ? "Fetching data..." 
                            : `${filteredSubjects.length} subjects found for this year`
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
                 /* ================= State 2: Loading ================= */
                <div className="flex h-64 items-center justify-center rounded-xl bg-white border border-gray-100">
                    <Loader message="Loading Subjects..." />
                </div>
            ) : filteredSubjects.length > 0 ? (
                 /* ================= State 3: Data Grid ================= */
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
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
                 /* ================= State 4: Empty / No Results ================= */
                <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-3">
                        {search ? (
                            <FaceFrownIcon className="h-6 w-6 text-gray-400" />
                        ) : (
                            <BookOpenIcon className="h-6 w-6 text-gray-400" />
                        )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        {search ? "No matches found" : "No subjects added yet"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {search 
                            ? `No subjects match the query "${search}"`
                            : "This curriculum is currently empty. Add a subject to get started."
                        }
                    </p>
                </div>
            )}
        </div>
    );
}