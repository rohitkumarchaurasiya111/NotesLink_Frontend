import { GitHubOctocatIcon } from "../icons/github-octocat-icon";

const DIFFICULTY_COLORS = {
  Easy:   "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40",
  Medium: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
  Hard:   "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/40",
};

export default function ProjectCard({ project }) {
  const { name, description, imageURL, deployedLink, githubLink, techStacksUsed, difficultyLevel } = project;

  const diffColor = DIFFICULTY_COLORS[difficultyLevel] || "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]";

  return (
    <div className="group flex flex-col h-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
      {/* Image */}
      <div className="relative h-44 bg-[var(--bg-elevated)] overflow-hidden flex-shrink-0">
        <img
          src={imageURL || "https://res.cloudinary.com/dfdusmc9k/image/upload/Project_Cover_Image_rzze7w.png"}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {difficultyLevel && (
          <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${diffColor}`}>
            {difficultyLevel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1 group-hover:text-[var(--accent)] transition-colors duration-150">
          {name}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
        {techStacksUsed && (
          <p className="text-[10px] text-[var(--text-tertiary)]">
            <span className="font-semibold uppercase tracking-wide">Stack: </span>
            {techStacksUsed}
          </p>
        )}
      </div>

      {/* Footer actions */}
      {(deployedLink || githubLink) && (
        <div className="px-4 pb-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {deployedLink ? (
            <a
              href={deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:opacity-75 transition-opacity"
            >
              Live demo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : <span />}

          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2.5 py-1 rounded-lg hover:bg-[var(--bg-elevated)]"
              title="Source on GitHub"
            >
              <span>Source</span>
              <div className="w-4 h-4"><GitHubOctocatIcon /></div>
            </a>
          )}
        </div>
      )}
    </div>
  );
}