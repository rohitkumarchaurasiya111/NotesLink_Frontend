import { useMemo, useState, useDeferredValue } from "react";
import AdminBookCard from "./AdminBookCard";
import { MagnifyingGlassIcon, BookOpenIcon, FaceFrownIcon } from "@heroicons/react/24/outline";

export default function AdminBookList({ books, setSelectedBook }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  /* ===========================
     Filtered Books (Optimized)
     =========================== */
  const filteredBooks = useMemo(() => {
    if (!deferredSearch.trim()) return books;

    const q = deferredSearch.toLowerCase();

    return books.filter((book) =>
      book.title?.toLowerCase().includes(q) ||
      book.authorName?.toLowerCase().includes(q) ||
      book.description?.toLowerCase().includes(q) ||
      book.bookCategory?.toLowerCase().includes(q)
    );
  }, [books, deferredSearch]);

  return (
    <div className="w-full space-y-8">

      {/* Header + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Book Library</h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredBooks.length}</span> of <span className="font-medium text-gray-900">{books.length}</span> total books
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Books Grid / Empty States */}
      {books.length === 0 ? (
        /* 📭 Empty State: No Books in DB */
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-20 text-center">
          <div className="mb-4 rounded-full bg-blue-50 p-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No books added yet</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Get started by adding a new book to the library using the form above.
          </p>
        </div>
      ) : filteredBooks.length > 0 ? (
        /* 📚 Grid Layout */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {filteredBooks.map((book) => (
            <AdminBookCard
              key={book.id}
              book={book}
              onEdit={() => setSelectedBook(book)}
            />
          ))}
        </div>
      ) : (
        /* 🔍 Empty State: No Search Results */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-gray-100 p-3">
            <FaceFrownIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn’t find any books matching “<span className="font-medium text-gray-900">{search}</span>”.
          </p>
          <button 
            onClick={() => setSearch("")}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}