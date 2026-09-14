import { useState, useEffect } from "react";
import { createSubject } from "../api/adminAPI";

export default function AdminSubjectForm({
  enabled,
  selectedSubject,
  onSuccess,
  onCancelEdit,
  collegeId,
  collegeName,
  year,
  setAlert,
  branches,
}) {
  const [form, setForm] = useState({
    name: "",
    imageURL: "",
    description: "",
    branch: "CSE",
    isProject: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const editMode = Boolean(selectedSubject);

  // 🔄 Prefill when editing
  useEffect(() => {
    if (editMode) {
      setForm({
        id: selectedSubject.id,
        name: selectedSubject.name,
        branch: selectedSubject.branch,
        imageURL: selectedSubject.imageURL || "",
        description: selectedSubject.description || "",
        isProject: selectedSubject.isProject,
      });
    } else {
      setForm({
        name: "",
        imageURL: "",
        description: "",
        branch: "CSE",
        isProject: false,
      });
    }
  }, [selectedSubject, editMode, year]);

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-[var(--text-secondary)]">
        Select a College and Year above to create or edit subjects.
      </div>
    );
  }

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

      await createSubject({
        ...form,
        college_id: Number(collegeId),
        year: year,
      });

      setAlert({
        type: "success",
        message: editMode
          ? "Subject updated successfully"
          : "Subject added successfully",
      });

      onSuccess?.();

      setForm({
        name: "",
        imageURL: "",
        description: "",
        branch: "CSE",
        isProject: false,
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
    "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
      {/* Top Accent Bar */}
      <div className={`h-1 w-full ${editMode ? "bg-amber-500" : "bg-[var(--accent)]"}`} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)] sm:text-xl">
                {editMode ? "Edit Subject" : "Create New Subject"}
              </h2>

              {editMode && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  ID: #{selectedSubject.id}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {editMode
                ? "Update the details for this subject."
                : `Adding subject for ${collegeName || "selected college"} (${year} year)`}
            </p>
          </div>

          {editMode && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={submitting}
              className="self-start sm:self-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Subject Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Subject Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="e.g. Advanced Data Structures"
                className={inputClass}
              />
            </div>

            {/* Branch */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Target Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                disabled={submitting}
                className={`${inputClass} cursor-pointer`}
              >
                {branches.map((b) => (
                  <option key={b} value={b} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Cover Image URL
              </label>
              <input
                name="imageURL"
                value={form.imageURL}
                onChange={handleChange}
                disabled={submitting}
                placeholder="https://images.unsplash.com/... or Cloudinary URL"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Write a brief overview of syllabus or core topics..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:justify-end">
            {editMode && (
              <button
                type="button"
                onClick={onCancelEdit}
                disabled={submitting}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${
                editMode
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
              } ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {submitting
                ? "Saving..."
                : editMode
                ? "Update Subject"
                : "Create Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}