import { useEffect, useState } from "react";
import SubjectCard from "./SubjectCard";
import { getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";

export default function SubjectList({ enabled, collegeId, year, setSelectedSubject, refreshKey, onOpenMaterialModal, }) {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!enabled || !collegeId || !year) return;

        async function getSubjects(collegeId, year) {
            setLoading(true);
            try {
                const response = await getSubjectListOfSpecificCollegeAndYear(collegeId, year);
                setSubjects(response.data);
            } catch (error) {
                console.error("Failed to fetch subjects", error);
            } finally {
                setLoading(false);
            }
        }
        getSubjects(collegeId, year);
    }, [enabled, collegeId, year, refreshKey]);

    // State: Waiting for user selection
    if (!enabled) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100 min-h-[300px]">
                <div className="mb-4 rounded-full bg-blue-50 p-4 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Selection Made</h3>
                <p className="text-gray-500 mt-1">Please select a College and Year above to view the curriculum.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Subject List</h2>
                    <p className="text-sm text-gray-500">{subjects.length} subjects found for this curriculum</p>
                </div>
            </div>

            {/* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */}
            {subjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {subjects.map((s) => (
                        <SubjectCard
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
                /* Empty State if API returns 0 items */
                !loading && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
                        No subjects found for this criteria.
                    </div>
                )
            )}
        </div>
    );
}