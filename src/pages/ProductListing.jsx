import ProductCard from "../components/productCard";
import OtherNavbar from "../components/OtherNavbar";
import {
    useLoaderData,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import Loader from "../components/Loader";
import BuildingMessage from "../components/BuildingMessage";
import { Years } from "../constants/Years";
import { useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../components/SearchInput";

export default function ProductListing() {
    const navigation = useNavigation(); // To show loading state
    const { products, year } = useLoaderData(); // Products + selected year
    const navigate = useNavigate();

    // Normalize products (defensive, production-safe)
    const safeProducts = Array.isArray(products) ? products : [];

    // Search state
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    // Handle year change
    const handleYearChange = (newYear) => {
        navigate(`/subjects?year=${newYear}`);
    };

    // Optimized client-side search (scoped to selected year)
    const filteredProducts = useMemo(() => {
        if (!debouncedSearch.trim()) return safeProducts;

        const q = debouncedSearch.toLowerCase();

        return safeProducts.filter((product) =>
            product.name?.toLowerCase().includes(q) ||
            product.description?.toLowerCase().includes(q) ||
            product.branch?.toLowerCase().includes(q)
        );
    }, [safeProducts, debouncedSearch]);

    return (
        <>
            <OtherNavbar />

            <div className="bg-gray-50 min-h-screen w-full">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                    {/* =====================
                        PAGE CONTROLS
                       ===================== */}
                    <div className="mb-10 flex flex-col items-center justify-center gap-4 md:flex-row md:items-start">

                        {/* Year Dropdown */}
                        <div className="w-full md:w-auto">
                            <select
                                value={year}
                                onChange={(e) => handleYearChange(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-48"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: `right 0.5rem center`,
                                    backgroundRepeat: `no-repeat`,
                                    backgroundSize: `1.5em 1.5em`
                                }}
                            >
                                {Years.map((yr) => (
                                    <option key={yr} value={yr}>
                                        {yr.charAt(0) + yr.slice(1).toLowerCase()} Year
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Input */}
                        <div className="w-full max-w-xl">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search subjects by name, description and branch"
                            />
                        </div>
                    </div>

                    {/* =====================
                        CONTENT AREA
                       ===================== */}

                    {/* Loading State */}
                    {navigation.state === "loading" && (
                        <div className="flex justify-center py-12">
                            <Loader message="Loading Subjects..." />
                        </div>
                    )}

                    {/* No subjects for selected year */}
                    {navigation.state !== "loading" && safeProducts.length === 0 && (
                        <div className="mt-8 flex justify-center">
                            <BuildingMessage message="We’re currently adding subjects for this year." />
                        </div>
                    )}

                    {/* No search results */}
                    {navigation.state !== "loading" &&
                        safeProducts.length > 0 &&
                        filteredProducts.length === 0 &&
                        debouncedSearch.trim() && (
                            <div className="mt-12 flex flex-col items-center justify-center text-center text-gray-500">
                                <div className="rounded-full bg-gray-100 p-4 mb-3">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                    No subjects found for “{debouncedSearch}”
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Try searching by name, description or branch
                                </p>
                            </div>
                        )
                    }

                    {/* Products Grid */}
                    {/* UI UPDATE: 
                        grid-cols-2 for Phone
                        lg:grid-cols-5 for Laptop/Windows (standard large screens)
                    */}
                    {navigation.state !== "loading" && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}