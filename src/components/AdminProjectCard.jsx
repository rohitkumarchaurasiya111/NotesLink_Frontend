export default function AdminProjectCard({
    project,
    onEdit,
}) {
    const {
        id,
        name,
        description,
        imageURL,
        techStacksUsed,
        difficultyLevel,
        deployedLink,
        githubLink,
        displayOrder,
        isActive,
    } = project;

    return (
        <div className="flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">

            <div className="flex flex-1 flex-col p-5 space-y-4">
                
                {/* Header: Thumbnail + Title + Meta */}
                <div className="flex gap-4">
                    
                    {/* Image Section (Thumbnail) */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                        {imageURL ? (
                            <img
                                src={imageURL}
                                alt={name}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center text-gray-400">
                                <svg className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px] font-medium">No Img</span>
                            </div>
                        )}
                    </div>

                    {/* Title & Status Section */}
                    <div className="flex flex-1 flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                {/* ID Badge */}
                                <span className="font-mono text-xs font-medium text-gray-400">
                                    #{id}
                                </span>
                                {/* Active Status */}
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide
                                    ${isActive
                                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                                        : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                                    }`}
                                >
                                    {isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                            
                            <h3 className="mt-1 text-lg font-bold text-gray-900 line-clamp-2 leading-tight" title={name}>
                                {name}
                            </h3>
                        </div>

                        {/* Difficulty Badge */}
                        {difficultyLevel && (
                            <div className="mt-2">
                                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                    {difficultyLevel}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {description}
                </p>

                {/* Meta Information Grid (Better scanning) */}
                <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3">
                    <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Order
                        </span>
                        <span className="mt-0.5 text-sm font-semibold text-gray-900">
                            {displayOrder}
                        </span>
                    </div>
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Tech Stack
                        </span>
                        <p className="mt-0.5 text-sm font-medium text-gray-900 line-clamp-1" title={techStacksUsed}>
                            {techStacksUsed || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex items-center gap-4 text-sm pt-1">
                    {deployedLink ? (
                         <a
                            href={deployedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="font-semibold">Live Demo</span>
                        </a>
                    ) : (
                        <span className="text-gray-400 text-xs italic">No Live Link</span>
                    )}

                    {githubLink ? (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Source Code</span>
                        </a>
                    ) : (
                         <span className="text-gray-400 text-xs italic">No Repo</span>
                    )}
                </div>

                {/* Admin Actions */}
                <div className="mt-auto pt-4">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(project)}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Project
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}