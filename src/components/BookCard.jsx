export default function BookCard({ book }) {
  const {
    title,
    authorName,
    description,
    imageURL,
    driveLink,
    bookCategory,
  } = book;

  const handleOpenBook = () => {
    window.open(driveLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleOpenBook}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={imageURL}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3 flex-grow flex flex-col">
        {/* Category & Meta */}
        <div className="flex items-start justify-between">
          <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 uppercase tracking-wide">
            {bookCategory.replace("_", " ")}
          </span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Author */}
        {authorName && (
          <p className="text-sm text-gray-500 font-medium">
            by <span className="text-gray-700">{authorName}</span>
          </p>
        )}

        {/* Description */}
        <p className="line-clamp-3 text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer CTA */}
      {/* This will always be at the bottom because of flex-grow above */}
      <div className="px-5 pb-5 pt-0 mt-auto">
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-sm font-semibold text-blue-600">
          <span>Read Now</span>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  );
}