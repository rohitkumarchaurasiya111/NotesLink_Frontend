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

  // Prevent double submission
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
      // reset when switching to create mode
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
      <div className="rounded-xl bg-white p-6 text-gray-400 shadow">
        Select College and Year to add subjects
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

  // Submitting the Details for Add or Edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Prevent duplicate submissions
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

      onSuccess?.(); // Set the Form again to Add Mode, once edit is done

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

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100 p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300">

        {/* Top Accent Bar */}
        <div className={`h-1.5 w-full ${editMode ? "bg-amber-500" : "bg-blue-600"}`} />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-gray-100 pb-8 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  {editMode ? "Edit Subject" : "Create Subject"}
                </h2>

                {/* --- HEADER ID BADGE --- */}
                {editMode && (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 pl-2 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600/15 text-[10px] text-amber-700">#ID:</span>
                    <span className="font-mono">{selectedSubject.id}</span>
                  </div>
                )}
              </div>
              <p className="mt-3 max-w-xl text-base text-gray-500">
                {editMode
                  ? "Update the existing subject details carefully."
                  : "Add a new subject to the selected college curriculum."}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* Subject Name */}
              <div>
                {/* --- LABEL ROW WITH ID --- */}
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Subject Name <span className="text-red-500">*</span>
                  </label>
                  {editMode && (
                    <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 font-mono ring-1 ring-gray-200" title="System ID">
                      <span className="text-gray-400 select-none">Subject ID:</span>
                      <span className="font-bold text-gray-700">{selectedSubject.id}</span>
                    </div>
                  )}
                </div>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="e.g. Advanced Data Structures"
                  className="w-full rounded-xl border-gray-300 px-4 py-3.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              {/* Branch */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Target Branch <span className="text-red-500">*</span>
                </label>
                <select
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full rounded-xl border-gray-300 px-4 py-3.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  name="imageURL"
                  value={form.imageURL}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full rounded-xl border-gray-300 px-4 py-3.5 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="Write a brief overview of the subject..."
                  className="w-full rounded-xl border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Project Toggle */}
            {/* <label
              className={`flex cursor-pointer gap-4 rounded-xl border p-5 transition-all duration-200
              ${form.isProject
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
                } ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  name="isProject"
                  checked={form.isProject}
                  onChange={handleChange}
                  disabled={submitting}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div>
                <p className={`text-sm font-bold ${form.isProject ? "text-blue-900" : "text-gray-900"}`}>
                  Is Project?
                </p>
                <p className={`text-xs ${form.isProject ? "text-blue-700" : "text-gray-500"}`}>
                  Enable this if the subject involves a major semester project.
                </p>
              </div>
            </label> */}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-4 border-t pt-8 sm:flex-row sm:justify-end">
              {editMode && (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  disabled={submitting}
                  className="rounded-xl border px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all
                ${editMode
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
    </div>
  );
}