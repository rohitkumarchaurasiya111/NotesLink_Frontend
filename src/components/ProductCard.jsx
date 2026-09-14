import { NavLink } from "react-router-dom";

const FALLBACK = "https://res.cloudinary.com/dfdusmc9k/image/upload/SubjectImage_jydtuy.png";

export default function ProductCard({ product }) {
  return (
    <NavLink
      to={`/subject/${product.id}/${encodeURIComponent(product.name)}`}
      className="group flex flex-col rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] overflow-hidden transition-all duration-200"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--bg-elevated)] aspect-[4/3]">
        <img
          alt={product.name}
          src={product.imageURL || FALLBACK}
          onError={(e) => { e.currentTarget.src = FALLBACK; }}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.branch && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--bg-surface)]/90 text-[var(--text-secondary)] border border-[var(--border-subtle)] backdrop-blur-sm">
            {product.branch}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-[var(--accent)] transition-colors duration-150">
          {product.name}
        </h3>
        <span className="inline-flex items-center gap-1 text-xs text-[var(--accent)] font-medium mt-1">
          View materials
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </NavLink>
  );
}
