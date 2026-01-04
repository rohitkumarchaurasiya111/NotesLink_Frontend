import { useLoaderData, useNavigation } from "react-router-dom";
import { useMemo, useState } from "react";

import Loader from "../components/Loader";
import OtherNavbar from "../components/OtherNavbar";
import BookCard from "../components/BookCard";
import BuildingMessage from "../components/BuildingMessage";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";   //Custom debounce hook

export default function BookListing() {
    const navigation = useNavigation();         //To show the loading state
    const { books } = useLoaderData();          // destructuring and getting the value from Loader of React-router

    const [search, setSearch] = useState("");   //To implement search Logic

    const debouncedSearch = useDebounce(search, 300);       // Wait for the user to stop typing before doing the work.

    // Optimized client-side search using debouncedSearch
    const filteredBooks = useMemo(() => {
        if (!debouncedSearch.trim()) return books;

        const q = debouncedSearch.toLowerCase();

        return books.filter((book) =>
            book.title?.toLowerCase().includes(q) ||
            book.description?.toLowerCase().includes(q) ||
            book.authorName?.toLowerCase().includes(q) ||
            book.bookCategory?.toLowerCase().includes(q)
        );
    }, [books, debouncedSearch]);

    return (
        <>
            <OtherNavbar />

            <div className="bg-gray-50 min-h-screen w-full">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                    {/*Search Input (Always Visible) */}
                    <div className="mb-8 flex justify-center sm:mb-12">
                        <div className="w-full max-w-xl lg:max-w-2xl">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search books by title, author, category..."
                            />
                        </div>
                    </div>

                    {/* Loading State (Route Transitions Only) */}
                    {navigation.state === "loading" && (
                        <div className="flex justify-center py-10">
                            <Loader message="Loading Books..." />
                        </div>
                    )}

                    {/* No books in database */}
                    {navigation.state !== "loading" && books.length === 0 && (
                        <BuildingMessage message="We’re currently adding books." />
                    )}

                    {/* Search returned no results -- INLINE MESSAGE */}
                    {navigation.state !== "loading" &&
                        books.length > 0 &&
                        filteredBooks.length === 0 &&
                        debouncedSearch.trim() && (
                            <div className="mt-12 flex flex-col items-center justify-center text-center text-gray-500">
                                <div className="rounded-full bg-gray-100 p-4 mb-3">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                    No books found for “{debouncedSearch}”
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Try searching by title, author, or category.
                                </p>
                            </div>
                        )
                    }

                    {/* 📚 Books Grid */}
                    {navigation.state !== "loading" && filteredBooks.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8">
                            {filteredBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}