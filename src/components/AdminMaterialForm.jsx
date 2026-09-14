import { useEffect, useState } from "react";
import { createMaterial, updateMaterial } from "../api/adminAPI";
import Loader from "./Loader";

export default function AdminCreateMaterialForm({
  subjectId,
  setAlert,
  selectedMaterial,
  setSelectedMaterial,
  onMaterialSave,
}) {
  const isEditMode = Boolean(selectedMaterial);

  if (!subjectId && !isEditMode) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center text-sm text-[var(--text-secondary)]">
        Select a subject to upload or edit materials.
      </div>
    );
  }

  const [material, setMaterial] = useState({
    title: "",
    type: "NOTES",
    subjectId: Number(subjectId),
    isPremium: true,
    displayOrder: null,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMaterial) {
      setMaterial({
        id: selectedMaterial.id,
        title: selectedMaterial.title,
        type: selectedMaterial.type,
        subjectId: selectedMaterial.subjectId,
        isPremium: selectedMaterial.isPremium,
        displayOrder: selectedMaterial.displayOrder,
        driveLink: selectedMaterial.driveLink,
      });
      setFile(null);
    }
  }, [selectedMaterial]);

  useEffect(() => {
    if (!selectedMaterial) {
      setMaterial((prev) => ({
        ...prev,
        subjectId: Number(subjectId),
      }));
    }
  }, [subjectId, selectedMaterial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMaterial((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
          ? value === "" ? null : Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setMaterial({
      title: "",
      type: "NOTES",
      subjectId: Number(subjectId),
      isPremium: true,
      displayOrder: null,
    });
    setFile(null);
  };

  const handleCancelEdit = () => {
    setSelectedMaterial(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && !file) {
      setAlert({
        type: "error",
        message: "Please select a material file to upload",
      });
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateMaterial(selectedMaterial.id, material);
      } else {
        await createMaterial(material, file);
      }
      setAlert({
        type: "success",
        message: isEditMode
          ? "Material updated successfully"
          : "Material added successfully",
      });

      setSelectedMaterial(null);
      resetForm();
      await onMaterialSave();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Operation failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50";

  return (
    <div className="relative w-full rounded-2xl bg-[var(--bg-surface)] shadow-sm border border-[var(--border-subtle)] overflow-hidden">
      {/* Top Accent Bar */}
      <div className={`h-1 w-full ${isEditMode ? "bg-amber-500" : "bg-[var(--accent)]"}`} />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg-surface)]/85 backdrop-blur-sm">
          <Loader size="lg" />
          <p className="mt-3 text-sm font-medium text-[var(--text-secondary)] animate-pulse">
            {isEditMode ? "Updating Resource..." : "Uploading File & Resource..."}
          </p>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-[var(--bg-elevated)] px-6 py-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {isEditMode ? "Edit Study Material" : "Add Study Material"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isEditMode
              ? "Update details or reorder this academic resource."
              : "Upload notes, question papers, or solutions for this subject."}
          </p>
        </div>

        {isEditMode && (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            ID: #{selectedMaterial.id}
          </span>
        )}
      </div>

      {/* Form Section */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Resource Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="e.g. Unit 1: Introduction to Data Structures & Analysis"
              className={inputClass}
              value={material.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* Grid for Type and Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Material Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                  value={material.type}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="NOTES" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Notes</option>
                  <option value="PYQ" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">PYQ (Previous Year Questions)</option>
                  <option value="PYQ_SOLUTION" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">PYQ Solution</option>
                  <option value="IMPORTANT_RESOURCES" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">Important Resources</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[var(--text-tertiary)]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Display Order <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="displayOrder"
                placeholder="e.g. 1"
                className={inputClass}
                value={material.displayOrder ?? ""}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* File Upload (Hidden in Edit Mode) */}
          {!isEditMode && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Upload Document <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="block w-full text-xs text-[var(--text-secondary)] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[var(--accent-light)] file:text-[var(--accent)] hover:file:bg-[var(--accent)]/20 border border-[var(--border-subtle)] bg-[var(--bg-elevated)] rounded-xl cursor-pointer focus:outline-none transition-colors"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-[11px] text-[var(--text-tertiary)] mt-1">Supported formats: PDF, DOCX, PPTX (up to 50MB)</p>
            </div>
          )}

          {/* Premium Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text-primary)]">Premium Content</span>
              <span className="text-xs text-[var(--text-secondary)]">Restricted to enrolled college students</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isPremium"
                className="peer sr-only"
                checked={material.isPremium}
                onChange={handleChange}
                disabled={loading}
              />
              <div className="h-6 w-11 rounded-full bg-[var(--bg-muted)] peer-focus:outline-none border border-[var(--border-subtle)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center gap-3">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors disabled:opacity-50"
              >
                Cancel Edit
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`flex-[2] py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${
                isEditMode
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? (isEditMode ? "Updating..." : "Uploading...")
                : (isEditMode ? "Update Material" : "Add Material")
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
