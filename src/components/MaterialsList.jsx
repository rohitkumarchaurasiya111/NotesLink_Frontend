import { Tag } from '../components/tag';
import { MATERIAL_TYPE } from '../constants/MATERIAL_TYPE';
import { MATERIAL_TYPE_LABEL } from '../constants/materialTypeLabel';
import ListCard from './MaterialCard';

export default function MaterialsList({ materials, editMode = false, onSelectMaterial }) {
  // If Materials are not present, Show Empty/Building State
  if (!materials || Object.keys(materials).length === 0) {
    if (editMode) {
      return (
        <div className="py-8 text-center text-sm text-[var(--text-secondary)]">
          No materials uploaded yet. Use the form above to add notes, question papers, or solutions.
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-2xl bg-[var(--accent-light)] p-5">
          <svg
            className="h-9 w-9 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-base font-bold text-[var(--text-primary)]">
          Curriculum Under Construction
        </h3>

        <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)] leading-relaxed">
          We’re currently compiling study materials for this subject.
          Please check back shortly!
        </p>
      </div>
    );
  }

  // IF Materials are present
  return (
    <div className="space-y-6">
      {Object.entries(MATERIAL_TYPE).map(([key, value]) => {
        if (!materials[value] || materials[value].length === 0) return null;

        return (
          <div key={key} className="space-y-3">
            <Tag variant="outlined" className="mt-2">
              {MATERIAL_TYPE_LABEL[key] ?? value}
            </Tag>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {materials[value].map((item) => (
                <ListCard
                  key={item.id}
                  item={item}
                  editMode={editMode}
                  onSelectMaterial={onSelectMaterial}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}