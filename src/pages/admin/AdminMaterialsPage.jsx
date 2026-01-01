import { getAllCollegeDetails, getAllMaterialsForGivenSubject } from "../../api/userApi";
import { CustomFullScreenModal } from "../../components/CustomFullScreenModal";
import MaterialsList from "../../components/MaterialsList";
import SubjectCard from "../../components/SubjectCard";
import SubjectFilterBar from "../../components/SubjectFilterBar";
import SubjectList from "../../components/SubjectList";
import { Years } from "../../constants/Years";
import CreateMaterialForm from "../../components/MaterialForm";
import { useState, useEffect, useCallback } from "react";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";


export default function AdminMaterialsPage() {
    const [collegeId, setCollegeId] = useState("");           // Selected CollegeId in Dropdown
    const [year, setYear] = useState("");                     // Selected Year in Dropdown
    const [alert, setAlert] = useState(null);                 // Alert state
    const [colleges, setColleges] = useState([]);             // List of Colleges available in Backend
    const [selectedSubject, setSelectedSubject] = useState(null);         // To select subjects from the List to Edit
    const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);      //Track if the Model is open or not
    const [materials, setMaterials] = useState({});                             //To show the current available materials
    const [loadingMaterials, setLoadingMaterials] = useState(false);            //To show loading 
    const [selectedMaterial, setSelectedMaterial] = useState(null);               //Material that is selected to Edit

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

    //To fetch the materials for Selected Subject
    const fetchMaterials = useCallback(async () => {
        if (!selectedSubject) return;

        try {
            setLoadingMaterials(true);
            const res = await getAllMaterialsForGivenSubject(selectedSubject.id);
            setMaterials(res.data);
        } catch {
            setAlert({
                type: "error",
                message: `Failed to load materials for given Subject , id: ${selectedSubject.id}`
            });
        } finally {
            setLoadingMaterials(false);
        }
    }, [selectedSubject]);

    useEffect(() => {
        if (isMaterialModalOpen && selectedSubject) fetchMaterials();
    }, [isMaterialModalOpen, selectedSubject, fetchMaterials]);

    const isReady = Boolean(collegeId && year);           // To see if: CollegeId and Years are selected or not

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">Material Management</h1>
                    <p className="text-sm text-gray-500">Select a college and year to manage study materials.</p>
                </div>

                {/* Filter Section */}
                <SubjectFilterBar
                    colleges={colleges}
                    years={Years}
                    collegeId={collegeId}
                    year={year}
                    onCollegeChange={setCollegeId}
                    onYearChange={setYear}
                />

                {/* Subject List Section */}
                {isReady && (
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Select a Subject</h2>
                        </div>

                        <SubjectList
                            enabled={isReady}
                            collegeId={collegeId}
                            year={year}
                            setSelectedSubject={setSelectedSubject}
                            onOpenMaterialModal={() => setIsMaterialModalOpen(true)}
                        />

                        {/* Informational Note */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm">
                                <span className="font-semibold">Note:</span> If a subject is missing from this list, please navigate to the Subject Management page to create it first.
                            </p>
                        </div>
                    </section>
                )}
            </div>

            {/* Edit/Create Material Modal */}
            <CustomFullScreenModal
                isOpen={isMaterialModalOpen}
                onClose={() => {
                    setIsMaterialModalOpen(false);
                    setSelectedSubject(null);
                    setSelectedMaterial(null);
                }}
            >
                {selectedSubject && (
                    <div className="min-h-screen bg-gray-50 pb-12">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                            {/* Modal Header Card */}
                            <div className="p-6 border-b border-gray-100">
                                <SubjectCard subject={selectedSubject} />
                            </div>

                            {/* Alert Area */}
                            {alert && (
                                <div className="rounded-lg overflow-hidden shadow-sm">
                                    <AlertMessage
                                        type={alert.type}
                                        message={alert.message}
                                        onClose={() => setAlert(null)}
                                    />
                                </div>
                            )}

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                                {/* Form Section */}
                                <CreateMaterialForm
                                    subjectId={selectedSubject.id}
                                    setAlert={setAlert}
                                    selectedMaterial={selectedMaterial}
                                    setSelectedMaterial={setSelectedMaterial}
                                    onMaterialSave={fetchMaterials}
                                />
                                {/* Existing Materials List Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Existing Materials
                                        </h3>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                            {materials?.length || 0} items
                                        </span>
                                    </div>

                                    {loadingMaterials ? (
                                        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                            <Loader size="lg" message="Loading Material..." />
                                        </div>
                                    ) : (
                                        <>
                                            {/* Added a wrapper div for list stability */}
                                            <MaterialsList
                                                materials={materials}
                                                editMode={true}
                                                onSelectMaterial={setSelectedMaterial}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CustomFullScreenModal>
        </div>
    );
}