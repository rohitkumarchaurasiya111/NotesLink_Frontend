import { useLoaderData, useNavigation } from "react-router-dom";
import { useMemo, useState } from "react";

import Loader from "../components/Loader";
import OtherNavbar from "../components/OtherNavbar";
import BuildingMessage from "../components/BuildingMessage";
import SearchInput from "../components/SearchInput";
import ProjectCard from "../components/ProjectCard";
import useDebounce from "../hooks/useDebounce";

export default function ProjectListing() {
    const navigation = useNavigation();           // To show loading state
    const { projects } = useLoaderData();         // Projects from loader

    const [search, setSearch] = useState("");     // Search input state
    const debouncedSearch = useDebounce(search, 300);

    // Optimized client-side search
    const filteredProjects = useMemo(() => {
        if (!debouncedSearch.trim()) return projects;

        const q = debouncedSearch.toLowerCase();

        return projects.filter((project) =>
            project.name?.toLowerCase().includes(q) ||
            project.description?.toLowerCase().includes(q) ||
            project.techStacksUsed?.toLowerCase().includes(q) ||
            project.difficultyLevel?.toLowerCase().includes(q)
        );
    }, [projects, debouncedSearch]);

    return (
        <>
            <OtherNavbar />

            <div className="bg-gray-50 min-h-screen w-full">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                    {/* Search Input */}
                    <div className="mb-10 flex justify-center">
                        <div className="w-full max-w-xl lg:max-w-2xl">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search projects by name, description, tech stack (java, python, react, springboot, javascript, etc...)"
                            />
                        </div>
                    </div>

                    {/* Loading State */}
                    {navigation.state === "loading" && (
                        <div className="flex justify-center py-10">
                            <Loader message="Loading Projects..." />
                        </div>
                    )}

                    {/* No projects in DB */}
                    {navigation.state !== "loading" && projects.length === 0 && (
                        <BuildingMessage message="We’re currently adding projects." />
                    )}

                    {/* No search results */}
                    {navigation.state !== "loading" &&
                        projects.length > 0 &&
                        filteredProjects.length === 0 &&
                        debouncedSearch.trim() && (
                            <div className="mt-12 flex flex-col items-center justify-center text-center text-gray-500">
                                <div className="rounded-full bg-gray-100 p-4 mb-3">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                    No projects found for “{debouncedSearch}”
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Try searching by name, tech stack, or difficulty level.
                                </p>
                            </div>
                        )
                    }

                    {/* Project List */}
                    {navigation.state !== "loading" && filteredProjects.length > 0 && (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}