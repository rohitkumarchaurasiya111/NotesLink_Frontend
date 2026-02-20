import { GitHubOctocatIcon } from "../icons/github-octocat-icon";

export default function ProjectCard({ project }) {
    const {
        name,
        description,
        imageURL,
        deployedLink,
        githubLink,
        techStacksUsed,
        difficultyLevel,
    } = project;

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100 sm:h-56">
                <img
                    src={imageURL || "https://res.cloudinary.com/dfdusmc9k/image/upload/Project_Cover_Image_rzze7w.png"}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Difficulty Badge (Overlay for better space usage) */}
                {difficultyLevel && (
                    <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-700 shadow-sm backdrop-blur-sm">
                            {difficultyLevel}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section (Flex grow pushes footer down) */}
            <div className="flex flex-grow flex-col p-5 space-y-3">

                {/* Title */}
                <h3 className="line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {name}
                </h3>

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {description}
                </p>

                {/* Tech Stack */}
                {techStacksUsed && (
                    <div className="mt-auto pt-2">
                        <p className="text-xs text-gray-500 line-clamp-2">
                            <span className="font-semibold text-gray-800 uppercase tracking-wide text-[10px]">
                                Tech Stack:
                            </span>{" "}
                            {techStacksUsed}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            {(deployedLink || githubLink) && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
                    <div className="flex items-center justify-between">

                        {/* Live Demo Link */}
                        {deployedLink ? (
                            <a
                                href={deployedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
                            >
                                <span>Live Demo</span>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        ) : (
                            /* Spacer to keep Github icon on the right if Live link is missing */
                            <div />
                        )}

                        {/* GitHub Link */}
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-black"
                                title="View Code on GitHub"
                            >
                                <span>Source</span>
                                <div className="h-5 w-5">
                                    <GitHubOctocatIcon />
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}