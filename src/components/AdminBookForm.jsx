import { useEffect, useState } from "react";
import Loader from "./Loader";
import { BookCategory } from "../constants/BookCategory";
import {
  UserIcon,
  PhotoIcon,
  DocumentTextIcon,
  HashtagIcon,
  CloudArrowUpIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { createBook, updateBook } from "../api/adminAPI";

export default function AdminBookForm({
  setAlert,
  onCancelEdit,
  selectedBook,
  onSuccess,
}) {
  const isEditMode = Boolean(selectedBook);

  const [book, setBook] = useState({
    title: "",
    authorName: "",
    imageURL: "",
    description: "",
    bookCategory: "ENGINEERING",
    displayOrder: "",
    isActive: true,
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setBook({
        id: selectedBook.id,
        title: selectedBook.title || "",
        authorName: selectedBook.authorName || "",
        imageURL: selectedBook.imageURL || "",
        description: selectedBook.description || "",
        bookCategory: selectedBook.bookCategory || "ENGINEERING",
        displayOrder: selectedBook.displayOrder ?? "",
        isActive: selectedBook.isActive ?? true,
        driveLink: selectedBook.driveLink || "",
      });
      setFile(null);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
          ? value
          : value,
    }));
  };

  const resetForm = () => {
    setBook({
      title: "",
      authorName: "",
      imageURL: "",
      description: "",
      bookCategory: "ENGINEERING",
      displayOrder: "",
      isActive: true,
    });
    setFile(null);
  };

  const handleCancelEdit = () => {
    onCancelEdit();
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && !file) {
      setAlert({
        type: "error",
        message: "Please upload a book PDF file",
      });
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateBook(selectedBook.id, book);
      } else {
        await createBook(book, file);
      }

      setAlert({
        type: "success",
        message: isEditMode
          ? "Book updated successfully"
          : "Book uploaded successfully",
      });

      onSuccess();
      resetForm();
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
    "block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] pl-10 pr-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50";

  return (
    <div className="relative w-full rounded-2xl bg-[var(--bg-surface)] shadow-sm border border-[var(--border-subtle)] overflow-hidden">
      {/* Top Accent Bar */}
      <div className={`h-1 w-full ${isEditMode ? "bg-amber-500" : "bg-[var(--accent)]"}`} />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--bg-surface)]/85 backdrop-blur-sm">
          <Loader size="lg" />
          <p className="mt-3 text-sm font-medium text-[var(--text-secondary)] animate-pulse">
            {isEditMode ? "Updating Book Details..." : "Uploading Book & PDF..."}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="bg-[var(--bg-elevated)] px-6 py-5 sm:px-8 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            {isEditMode ? "Edit Book Details" : "Add New Book"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isEditMode
              ? "Modify the metadata and settings for this book."
              : "Upload a new PDF book and configure its metadata."}
          </p>
        </div>
        {isEditMode && (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            ID: #{selectedBook.id}
          </span>
        )}
      </div>

      {/* Form */}
      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Book Information
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <DocumentTextIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="e.g. Engineering Mathematics I"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Author Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <UserIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <input
                    type="text"
                    name="authorName"
                    value={book.authorName}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="e.g. B.S. Grewal"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <TagIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <select
                    name="bookCategory"
                    value={book.bookCategory}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {BookCategory.map((b) => (
                      <option key={b} value={b} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                        {b.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={loading}
                  placeholder="Brief summary of the book content and syllabus alignment..."
                  className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Media & Files */}
          <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Media & Files
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Cover Image URL */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <PhotoIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <input
                    type="url"
                    name="imageURL"
                    value={book.imageURL}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Display Order <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <HashtagIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </div>
                  <input
                    type="number"
                    name="displayOrder"
                    value={book.displayOrder ?? ""}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="1"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* File Upload (ADD ONLY) */}
            {!isEditMode && (
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Upload Book PDF <span className="text-red-500">*</span>
                </label>
                <div className={`mt-1.5 flex justify-center rounded-2xl border border-dashed px-6 py-8 transition-colors ${
                  file 
                    ? "border-[var(--accent)] bg-[var(--accent-light)]" 
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/50"
                }`}>
                  <div className="text-center">
                    <CloudArrowUpIcon className={`mx-auto h-10 w-10 ${file ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`} />
                    <div className="mt-3 flex text-sm text-[var(--text-secondary)] justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-[var(--accent)] hover:underline focus-within:outline-none"
                      >
                        <span>{file ? "Change PDF file" : "Upload a PDF file"}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                          disabled={loading}
                        />
                      </label>
                      {!file && <p className="pl-1 text-[var(--text-tertiary)]">or drag and drop</p>}
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">
                      {file ? (
                        <span className="font-semibold text-[var(--text-primary)]">{file.name}</span>
                      ) : (
                        "PDF up to 50MB"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Status & Actions */}
          <div className="flex flex-col gap-5 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Active Toggle Switch */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={book.isActive}
                onChange={handleChange}
                disabled={loading}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-[var(--bg-muted)] peer-focus:outline-none border border-[var(--border-subtle)] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              <span className="ml-3 text-xs font-semibold text-[var(--text-primary)]">
                {book.isActive ? "Visible in Library" : "Hidden from Students"}
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 w-full sm:w-auto">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="flex-1 sm:flex-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-muted)] disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 sm:flex-none rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${
                  isEditMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading
                  ? (isEditMode ? "Saving..." : "Uploading...")
                  : (isEditMode ? "Update Changes" : "Upload Book")
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}