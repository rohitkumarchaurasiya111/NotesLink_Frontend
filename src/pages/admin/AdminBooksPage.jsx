import { useEffect, useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import AdminBookList from "../../components/AdminBookList";
import { getAllBooksEitherActiveOrInactive } from "../../api/adminAPI";
import AdminBookForm from "../../components/AdminBookForm";
import { BookOpenIcon } from "@heroicons/react/24/outline";

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
                console.log(response)
            } catch (err) {
                setAlert({
                    type: "error",
                    message: "Failed to load books",
                });
            }
        }
        fetchBooks();
    }, [refreshKey]);

    return (
        /* UI UPDATE: Added main container for full-page background styling */
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* UI UPDATE: Page Header */}
                <div className="mb-8  items-center gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Book Management
                        </h1>
                        <p className="text-sm text-gray-500">
                            Upload PDF resources, manage metadata, and toggle visibility.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="mb-8">
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
                    <div className="mb-8 animate-fade-in-down">
                        <AlertMessage {...alert} onClose={() => setAlert(null)} />
                    </div>
                )}

                {/* List Section */}
                {/* UI UPDATE: Wrapped the list in a white card to create a distinct "Library Panel" feel */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <AdminBookList
                            books={books}
                            setSelectedBook={setSelectedBook}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}