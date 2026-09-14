import { useEffect, useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import AdminBookList from "../../components/AdminBookList";
import { getAllBooksEitherActiveOrInactive } from "../../api/adminAPI";
import AdminBookForm from "../../components/AdminBookForm";

export default function AdminBooksPage() {
  const [alert, setAlert] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await getAllBooksEitherActiveOrInactive();
        setBooks(response || []);
      } catch (err) {
        setAlert({
          type: "error",
          message: "Failed to load books from database",
        });
      }
    }
    fetchBooks();
  }, [refreshKey]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Book Management
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Upload PDF textbooks, manage academic metadata, and configure catalog visibility.
        </p>
      </div>

      {/* Form Section */}
      <div>
        <AdminBookForm
          selectedBook={selectedBook}
          setAlert={setAlert}
          onSuccess={() => {
            setSelectedBook(null);
            setRefreshKey((k) => k + 1);
          }}
          onCancelEdit={() => setSelectedBook(null)}
        />
      </div>

      {/* Alert Notification */}
      {alert && (
        <AlertMessage {...alert} onClose={() => setAlert(null)} />
      )}

      {/* List Section */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm">
        <AdminBookList
          books={books}
          setSelectedBook={setSelectedBook}
        />
      </section>
    </div>
  );
}