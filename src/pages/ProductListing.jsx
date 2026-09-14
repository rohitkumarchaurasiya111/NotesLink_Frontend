import ProductCard from "../components/ProductCard";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import BuildingMessage from "../components/BuildingMessage";
import { Years } from "../constants/Years";
import { useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../components/SearchInput";

export default function ProductListing() {
  const navigation = useNavigation();
  const { products, year } = useLoaderData();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products : [];
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const isYearLoading =
    navigation.state === "loading" &&
    (!navigation.location || navigation.location.pathname === "/subjects");

  const handleYearChange = (newYear) => {
    navigate(`/subjects?year=${newYear}`);
  };

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return safeProducts;
    const q = debouncedSearch.toLowerCase();
    return safeProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.branch?.toLowerCase().includes(q)
    );
  }, [safeProducts, debouncedSearch]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Page header */}
        <div className="mb-8 pb-6 border-b border-[var(--border-subtle)]">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">Subjects</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Semester-wise lecture notes, PYQs and study materials
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Year pill tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {Years.map((yr) => {
              const isSelected = year?.toUpperCase() === yr.toUpperCase();
              return (
                <button
                  key={yr}
                  onClick={() => handleYearChange(yr)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 border cursor-pointer ${
                    isSelected
                      ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {yr.charAt(0) + yr.slice(1).toLowerCase()} Year
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="sm:ml-auto w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search subjects..."
            />
          </div>
        </div>

        {/* Loading skeleton */}
        {isYearLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden nl-skeleton">
                <div className="aspect-[4/3] bg-[var(--bg-muted)]" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3 rounded bg-[var(--bg-muted)] w-3/4" />
                  <div className="h-3 rounded bg-[var(--bg-muted)] w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty — no subjects for year */}
        {!isYearLoading && safeProducts.length === 0 && (
          <div className="flex justify-center mt-12">
            <BuildingMessage message="We're adding curriculum subjects for this academic year." />
          </div>
        )}

        {/* Empty — no search results */}
        {!isYearLoading && safeProducts.length > 0 && filteredProducts.length === 0 && debouncedSearch.trim() && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-1">No results for "{debouncedSearch}"</p>
            <p className="text-xs text-[var(--text-secondary)] mb-4">Try a different name or branch</p>
            <button
              onClick={() => setSearch("")}
              className="text-xs font-medium text-[var(--accent)] hover:opacity-75 transition-opacity cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Products grid */}
        {!isYearLoading && filteredProducts.length > 0 && (
          <>
            <p className="text-xs text-[var(--text-tertiary)] mb-4">{filteredProducts.length} subject{filteredProducts.length !== 1 ? "s" : ""}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}