import { Tag } from '../components/tag';
import { MATERIAL_TYPE } from '../constants/MATERIAL_TYPE';
import { MATERIAL_TYPE_LABEL } from '../constants/materialTypeLabel';
import ListCard from './MaterialCard';

export default function MaterialsList({ materials }) {

    // If Materials are not present, Show Building in Progress
    if (!materials || Object.keys(materials).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-full bg-blue-50 p-6">
                    <svg
                        className="h-10 w-10 text-blue-500"
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

                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    Building in Progress
                </h3>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                    We’re currently adding materials for this subjects.
                    <br />
                    Please check back soon!
                </p>
            </div>
        );
    }

    // IF Materials are present, below block will run
    return (
        <div>
            {/* Itterating Over the Material Type to Display all the Type of Materials that we have */}
            {Object.entries(MATERIAL_TYPE).map(([key, value]) => {
                if (!materials[value]) return null;         //if specific material type not present, show null
                
                //if materials of specific type is present,
                // JSX must be returned explicitly, So return is written
                return (
                    <div key={key}>
                        {/* Material Type Label gives a specific name for given key which we want to display, If that Specific Name is not present then gives the actual value only */}
                        <Tag variant="outlined" className="mt-3">{MATERIAL_TYPE_LABEL[key] ?? value}</Tag>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Iterating over the materials of specific type, and displaying them in card format */}
                            {materials[value].map((item) => (
                                <ListCard item={item} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}