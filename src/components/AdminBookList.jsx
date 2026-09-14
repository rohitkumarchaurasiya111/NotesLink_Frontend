import { useMemo, useState, useDeferredValue } from "react";
import AdminBookCard from "./AdminBookCard";
import { MagnifyingGlassIcon, BookOpenIcon, FaceFrownIcon } from "@heroicons/react/24/outline";

export default function AdminBookList({ books, setSelectedBook }) {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

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
    <div className="w-full space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Book Library</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Showing <span className="font-semibold text-[var(--text-primary)]">{filteredBooks.length}</span> of <span className="font-semibold text-[var(--text-primary)]">{books.length}</span> total books
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <MagnifyingGlassIcon className="h-4 w-4 text-[var(--text-tertiary)]" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search by title, author, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-2.5 pl-10 pr-3.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] transition-colors focus:border-[var(--accent)] focus:bg-[var(--bg-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Books Grid / Empty States */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 text-center">
          <div className="mb-4 rounded-2xl bg-[var(--accent-light)] p-4">
            <BookOpenIcon className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">No books added yet</h3>
          <p className="mt-1.5 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed">
            Get started by uploading your first reference textbook or resource using the form above.
          </p>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <AdminBookCard
              key={book.id}
              book={book}
              onEdit={() => setSelectedBook(book)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-16 text-center shadow-sm">
          <div className="mb-4 rounded-2xl bg-[var(--bg-elevated)] p-3.5">
            <FaceFrownIcon className="h-6 w-6 text-[var(--text-tertiary)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">No books found</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)] max-w-sm">
            We couldn’t find any books matching “<span className="font-semibold text-[var(--text-primary)]">{search}</span>”.
          </p>
          <button 
            onClick={() => setSearch("")}
            className="mt-4 text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}
    </div>
  );
}