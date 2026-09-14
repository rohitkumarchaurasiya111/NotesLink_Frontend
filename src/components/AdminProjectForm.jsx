import { useEffect, useState } from "react";
import { ProjectDifficulty } from "../constants/ProjectDifficulty";
import { addProject, updateProject } from "../api/adminAPI";
import Loader from "./Loader";

export default function AdminProjectForm({
  selectedProject,
  onCancelEdit,
  onSuccess,
  setAlert,
}) {
  const editMode = Boolean(selectedProject);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const inputClass =
    "block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50";

  return (
    <div className="relative w-full rounded-2xl bg-[var(--bg-surface)] shadow-sm border border-[var(--border-subtle)] overflow-hidden">
      {/* Top Accent Bar */}
      <div className={`h-1 w-full ${editMode ? "bg-amber-500" : "bg-[var(--accent)]"}`} />

      {/* Loader */}
      {submitting && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg-surface)]/85 backdrop-blur-sm">
          <Loader size="lg" />
          <p className="mt-3 text-sm font-medium text-[var(--text-secondary)] animate-pulse">
            {editMode ? "Updating Project..." : "Adding Project..."}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="bg-[var(--bg-elevated)] px-6 py-5 sm:px-8 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            {editMode ? "Edit Project" : "Add New Project"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {editMode
              ? "Modify the project details and links."
              : "Showcase a new student or academic project."}
          </p>
        </div>
        {editMode && (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            ID: #{selectedProject.id}
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. NotesLink Application"
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  placeholder="Brief summary of the project architecture, features and goals..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Cover Image URL
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-4 w-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="imageURL"
                    value={form.imageURL}
                    onChange={handleChange}
                    placeholder="https://example.com/screenshot.png"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Technical Details Section */}
          <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Technical Details
            </h3>

            {/* Tech Stack */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Tech Stack <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg className="h-4 w-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="techStacksUsed"
                  value={form.techStacksUsed}
                  onChange={handleChange}
                  required
                  placeholder="React, Spring Boot, PostgreSQL, TailwindCSS..."
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Difficulty */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  value={form.difficultyLevel}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {ProjectDifficulty.map((level) => (
                    <option key={level} value={level} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Display Order
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  value={form.displayOrder}
                  onChange={handleChange}
                  placeholder="1"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 3. Links Section */}
          <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Project Links
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Live Demo */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Live Deployment URL
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-4 w-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="deployedLink"
                    value={form.deployedLink}
                    onChange={handleChange}
                    placeholder="https://myproject.vercel.app"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg className="h-4 w-4 text-[var(--text-tertiary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    name="githubLink"
                    value={form.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repository"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Settings & Actions */}
          <div className="flex flex-col gap-5 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Active Toggle Switch */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                disabled={submitting}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-[var(--bg-muted)] peer-focus:outline-none border border-[var(--border-subtle)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              <span className="ml-3 text-xs font-semibold text-[var(--text-primary)]">
                {form.isActive ? "Visible in Showcase" : "Hidden Project"}
              </span>
            </label>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full sm:w-auto">
              {editMode && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  disabled={submitting}
                  className="flex-1 sm:flex-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-muted)] disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 sm:flex-none rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${
                  editMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
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
    </div>
  );
}