import { Tag } from '../components/tag';
import { MATERIAL_TYPE } from '../constants/MATERIAL_TYPE';
import { MATERIAL_TYPE_LABEL } from '../constants/materialTypeLabel';
import ListCard from './ListCard';

export default function MaterialsList({ materials }) {

    console.log(materials);

    if (!materials) return (<div><h3>Building in Process...</h3></div>);
    return (
        <div>
            {/* Itterating Over the Material Type to Display all the Type of Materials that we have */}
            {Object.entries(MATERIAL_TYPE).map(([key, value]) => {
                if (!materials[value]) return null;
                // JSX must be returned explicitly
                return (
                    <div key={key}>
                        {/* Material Type Label gives a specific name for given key which we want to display, If that Specific Name is not present then gives the actual value only */}
                        <Tag variant="outlined" className="mt-3">{MATERIAL_TYPE_LABEL[key] ?? value}</Tag>
                        <ListCard material={materials[key]} />
                    </div>
                );
            })}
        </div>
    );
}