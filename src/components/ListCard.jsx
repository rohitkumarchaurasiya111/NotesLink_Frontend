import { StarIcon } from "../icons/star-icon";

//This function will give you a List of items By Accepting items Array as a Prop, it will iterate over all the elemnents and then gives the list of each items
export default function ListCard({ material }) {
  console.log(material);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {material.map((item) => (
        <div
          key={item.id}
          className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <a
            href={item.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            {/* ⭐ Premium Icon */}
            {item.isPremium && (
              <StarIcon
                className="absolute right-4 top-4 h-5 w-5 text-yellow-500"
                title="Premium"
              />
            )}

            {/* Card Content */}
            <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {item.type}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">
                Open Material →
              </span>

              {item.isPremium && (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  Premium
                </span>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
