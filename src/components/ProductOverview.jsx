import { NavLink } from "react-router-dom";
import Highlights from "./Highlights";
import ListCard from "./MaterialCard";
import MaterialsList from "./MaterialsList";
import Quote from "./quote";

export default function ProductOverview({ specificProduct, materials }) {
  return (
    <div className="bg-[var(--bg-base)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm flex-wrap">
            <li>
              <NavLink
                to={`/subjects?year=FIRST`}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {specificProduct.college_name}
              </NavLink>
            </li>
            <li className="text-[var(--text-tertiary)]">/</li>
            <li>
              <NavLink
                to={`/subjects?year=${specificProduct.year}`}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {specificProduct.year} Year
              </NavLink>
            </li>
            <li className="text-[var(--text-tertiary)]">/</li>
            <li className="text-[var(--text-primary)] font-medium" aria-current="page">
              {specificProduct.name}
            </li>
          </ol>
        </nav>

        {/* Subject header */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10 mb-10">
          {/* Image */}
          <div className="lg:col-span-1 mb-6 lg:mb-0">
            <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
              <img
                alt={specificProduct.name}
                src={specificProduct.imageURL || "https://res.cloudinary.com/dfdusmc9k/image/upload/SubjectImage_jydtuy.png"}
                className="w-full object-cover aspect-[4/3] lg:sticky lg:top-20"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight mb-3">
              {specificProduct.name}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {specificProduct.description}
            </p>
            <Highlights />
            <Quote />
          </div>
        </div>

        {/* Materials list */}
        <div className="border-t border-[var(--border-subtle)] pt-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Study Materials</h2>
          <MaterialsList materials={materials} />
        </div>
      </div>
    </div>
  );
}
