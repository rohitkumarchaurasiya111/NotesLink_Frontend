import { getAllCollegeDetails } from "../../api/userApi";
import AlertMessage from "../../components/AlertMessage";
import { useEffect, useState, useMemo } from "react";
import { Years } from "../../constants/Years";
import { Branches } from "../../constants/Branches";
import AdminSubjectForm from "../../components/AdminSubjectForm";
import AdminSubjectFilterBar from "../../components/AdminSubjectFilterBar";
import AdminSubjectList from "../../components/AdminSubjectList";

export default function AdminSubjectsPage() {
    const [collegeId, setCollegeId] = useState("");           // Selected CollegeId in Dropdown
    const [year, setYear] = useState("");                     // Selected Year in Dropdown
    const [alert, setAlert] = useState(null);                 // Alert state
    const [colleges, setColleges] = useState([]);             // List of Colleges available in Backend
    const [selectedSubject, setSelectedSubject] = useState(null);         // To select subjects from the List to Edit
    const [refreshKey, setRefreshKey] = useState(0);                      // To refresh or refetch the Subject whenever there subjects are added or edited

    // Fetches the List of Colleges that are available in our Backend. 
    useEffect(() => {
        async function getAllColleges() {
            try {
                const response = await getAllCollegeDetails();
                setColleges(response.data);
            } catch (error) {
                setAlert({
                    type: "error",
                    message: "Failed to load colleges. Please try again."
                });
            }
        }
        getAllColleges();
    }, []);

    const isReady = Boolean(collegeId && year);           // To see if: CollegeId and Years are selected or not

    const selectedCollegeName = useMemo(() => {
        return colleges.find(c => c.id === Number(collegeId))?.name;
    }, [colleges, collegeId]);

    return (
        <div className="min-h-screen w-full bg-gray-50/50 pb-20 pt-8">
            {/* Centered Container for better wide-screen viewing */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Subject Management</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Configure the curriculum by selecting a college and year below.
                    </p>
                </div>

                {/* Filters to select College and Year */}
                <AdminSubjectFilterBar
                    colleges={colleges}
                    years={Years}
                    collegeId={collegeId}
                    year={year}
                    onCollegeChange={setCollegeId}
                    onYearChange={setYear}
                />

                {/* Alert - with a fixed height placeholder to prevent layout jumps if needed, or just conditional */}
                <div className="mb-6">
                    {alert && (
                        <AlertMessage
                            type={alert.type}
                            message={alert.message}
                            onClose={() => setAlert(null)}        // If onClose is called it will setAlert to null
                        />
                    )}
                </div>

                <div className="space-y-10">
                    {/* Subject Form */}
                    <section>
                        <AdminSubjectForm
                            enabled={isReady}
                            selectedSubject={selectedSubject}
                            onSuccess={() => {
                                setSelectedSubject(null);               // Exit the Edit Mode
                                setRefreshKey(prev => prev + 1);        // 🔄 trigger refetch
                            }}
                            onCancelEdit={() => setSelectedSubject(null)}
                            collegeId={collegeId}
                            collegeName={selectedCollegeName}
                            year={year}
                            setAlert={setAlert}                   // Passing Set Alert function so that it can be used
                            branches={Branches}
                        />
                    </section>

                    {/* Subject List - Only render if filters are selected to keep UI clean */}
                    {isReady && (
                        <section className="border-t border-gray-200 pt-10">
                            <AdminSubjectList
                                enabled={isReady}
                                collegeId={collegeId}
                                year={year}
                                setSelectedSubject={setSelectedSubject}
                                refreshKey={refreshKey}               // To refetch the subjects after edit or add
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}