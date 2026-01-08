import { useEffect, useState } from "react";
import { ProjectDifficulty } from "../constants/ProjectDifficulty";
import { addProject, updateProject } from "../api/adminAPI";
import Loader from "./Loader"; // ✅ added

export default function AdminProjectForm({
    selectedProject,
    onCancelEdit,
    onSuccess,
    setAlert,
    loading = false,
}) {
    const editMode = Boolean(selectedProject);

    // Prevent double submission
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        imageURL: "",
        techStacksUsed: "",
        difficultyLevel: "INTERMEDIATE",
        deployedLink: "",
        githubLink: "",
        displayOrder: 1,
        isActive: true,
    });

    /* ===========================
       Prefill form in Edit Mode
       =========================== */
    useEffect(() => {
        if (editMode) {
            setForm({
                id: selectedProject.id || "",
                name: selectedProject.name || "",
                slug: selectedProject.slug || "",
                description: selectedProject.description || "",
                imageURL: selectedProject.imageURL || "",
                techStacksUsed: selectedProject.techStacksUsed || "",
                difficultyLevel: selectedProject.difficultyLevel || "INTERMEDIATE",
                deployedLink: selectedProject.deployedLink || "",
                githubLink: selectedProject.githubLink || "",
                displayOrder: selectedProject.displayOrder ?? 1,
                isActive: selectedProject.isActive ?? true,
            });
        } else {
            setForm({
                name: "",
                description: "",
                imageURL: "",
                techStacksUsed: "",
                difficultyLevel: "INTERMEDIATE",
                deployedLink: "",
                githubLink: "",
                displayOrder: 1,
                isActive: true,
            });
        }
    }, [editMode, selectedProject]);

    /* ===========================
       Input Change Handler
       =========================== */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    /* ===========================
       Submit Handler
       =========================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Prevent duplicate submissions
        if (submitting) return;

        try {
            setSubmitting(true);

            if (editMode) {
                await updateProject({ ...form }, selectedProject.id);
            } else {
                await addProject({ ...form });
            }

            setAlert({
                type: "success",
                message: editMode
                    ? "Project updated successfully"
                    : "Project added successfully",
            });

            onSuccess?.();

            setForm({
                name: "",
                description: "",
                imageURL: "",
                techStacksUsed: "",
                difficultyLevel: "INTERMEDIATE",
                deployedLink: "",
                githubLink: "",
                displayOrder: 1,
                isActive: true,
            });
        } catch (err) {
            setAlert({
                type: "error",
                message: err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative">
            {/* 🔄 Loader (ONLY while submitting) */}
            {submitting && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
                    <Loader
                        message={editMode ? "Updating Project..." : "Adding Project..."}
                    />
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={`space-y-8
                ${submitting ? "opacity-50 pointer-events-none" : ""}`}
            >
                {/* 1. Basic Information Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Basic Information
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Project Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. NotesLink Application"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                placeholder="Brief summary of the project features and goals..."
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border resize-none"
                            />
                        </div>

                        {/* Image URL with Icon */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Cover Image URL
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    name="imageURL"
                                    value={form.imageURL}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.png"
                                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 border"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Technical Details Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-t pt-6">
                        Technical Details
                    </h3>

                    {/* Tech Stack */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Tech Stack <span className="text-red-500">*</span>
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="techStacksUsed"
                                value={form.techStacksUsed}
                                onChange={handleChange}
                                required
                                placeholder="React, Node.js, MongoDB..."
                                className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 border"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Difficulty */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Difficulty Level
                            </label>
                            <select
                                name="difficultyLevel"
                                value={form.difficultyLevel}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                            >
                                {ProjectDifficulty.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Display Order */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Display Order
                            </label>
                            <input
                                type="number"
                                name="displayOrder"
                                value={form.displayOrder}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Links Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-t pt-6">
                        Project Links
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Live Demo */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Live Deployment URL
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    name="deployedLink"
                                    value={form.deployedLink}
                                    onChange={handleChange}
                                    placeholder="https://myproject.com"
                                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 border"
                                />
                            </div>
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                GitHub Repository URL
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="url"
                                    name="githubLink"
                                    value={form.githubLink}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username/repo"
                                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 border"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Settings & Actions */}
                <div className="flex flex-col gap-6 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

                    {/* Active Toggle Switch */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                                className="peer sr-only"
                            />
                            <div className="h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-700">
                                {form.isActive ? "Project is Active" : "Project is Hidden"}
                            </span>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {editMode && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                disabled={submitting}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting
                                ? editMode
                                    ? "Updating..."
                                    : "Adding..."
                                : editMode
                                    ? "Update Project"
                                    : "Add Project"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}