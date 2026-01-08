import { useEffect, useState } from "react";
import Loader from "./Loader";
import { BookCategory } from "../constants/BookCategory";
import {
  UserIcon,
  PhotoIcon,
  DocumentTextIcon,
  HashtagIcon,
  CloudArrowUpIcon,
  TagIcon
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
    bookCategory: "B_TECH", // Default fallback
    displayOrder: "",
    isActive: true,
  });

  const [file, setFile] = useState(null);        // 📁 Book file (PDF)
  const [loading, setLoading] = useState(false);

  /* ================= Populate form in Edit mode ================= */
  useEffect(() => {
    if (selectedBook) {
      setBook({
        id: selectedBook.id,
        title: selectedBook.title || "",
        authorName: selectedBook.authorName || "",
        imageURL: selectedBook.imageURL || "",
        description: selectedBook.description || "",
        bookCategory: selectedBook.bookCategory || "B_TECH",
        displayOrder: selectedBook.displayOrder ?? "",
        isActive: selectedBook.isActive ?? true,
        driveLink: selectedBook.driveLink || "",
      });
      setFile(null);
    }
  }, [selectedBook]);

  /* ================= Input Handler ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
            ? value // Keep as string for input, convert on submit if needed
            : value,
    }));
  };

  /* ================= Reset ================= */
  const resetForm = () => {
    setBook({
      title: "",
      authorName: "",
      imageURL: "",
      description: "",
      bookCategory: "B_TECH",
      displayOrder: "",
      isActive: true,
    });
    setFile(null);
  };

  /* ================= Cancel Edit ================= */
  const handleCancelEdit = () => {
    onCancelEdit();
    resetForm();
  };

  /* ================= Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode && !file) {
      setAlert({
        type: "error",
        message: "Please upload a book file",
      });
      return;
    }

    try {
      setLoading(true);
      console.log(book);
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

  return (
    <div className="relative w-full rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">

      {/* ================= Loading Overlay ================= */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
          <Loader size="lg" />
          <p className="mt-4 text-sm font-semibold text-gray-700 animate-pulse">
            {isEditMode ? "Updating Book Details..." : "Uploading Book & Files..."}
          </p>
        </div>
      )}

      {/* ================= Header ================= */}
      <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Book Details" : "Add New Book"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? "Modify the metadata for this book."
              : "Fill in the details below to add a new book to the library."}
          </p>
        </div>
        {isEditMode && (
          <span className="hidden sm:inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            ID: #{selectedBook.id}
          </span>
        )}
      </div>

      {/* ================= Form ================= */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1: Basic Information */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Book Information
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="e.g. Engineering Mathematics I"
                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 shadow-sm border"
                  />
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Author Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="authorName"
                    value={book.authorName}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="e.g. B.S. Grewal"
                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 shadow-sm border"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="bookCategory"
                    value={book.bookCategory}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 shadow-sm border appearance-none bg-white"
                  >
                    {BookCategory.map((b) => (
                      <option key={b} value={b}>
                        {b.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={loading}
                  placeholder="Brief summary of the book content..."
                  className="block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 shadow-sm border resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Media & Files */}
          <div className="space-y-5 border-t border-gray-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Media & Files
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Image URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <PhotoIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="imageURL"
                    value={book.imageURL}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="https://..."
                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 shadow-sm border"
                  />
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Display Order <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <HashtagIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="displayOrder"
                    value={book.displayOrder ?? ""}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="1"
                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 shadow-sm border"
                  />
                </div>
              </div>
            </div>

            {/* File Upload (ADD ONLY) */}
            {!isEditMode && (
              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Upload Book PDF <span className="text-red-500">*</span>
                </label>
                <div className={`mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-8 transition-colors ${file ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}>
                  <div className="text-center">
                    <CloudArrowUpIcon className={`mx-auto h-10 w-10 ${file ? 'text-blue-500' : 'text-gray-300'}`} />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>{file ? "Change file" : "Upload a file"}</span>
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
                      {!file && <p className="pl-1">or drag and drop</p>}
                    </div>
                    <p className="text-xs leading-5 text-gray-500 mt-1">
                      {file ? (
                        <span className="font-semibold text-gray-900">{file.name}</span>
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
          <div className="flex flex-col gap-6 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

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
              <div className="h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {book.isActive ? "Book is Visible" : "Book is Hidden"}
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 w-full sm:w-auto">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="flex-1 sm:flex-none rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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