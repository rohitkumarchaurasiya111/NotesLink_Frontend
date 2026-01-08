import { useEffect, useState } from "react";
import { getAllProjectDetails } from "../../api/userApi";
import AlertMessage from "../../components/AlertMessage";
import AdminProjectList from "../../components/AdminProjectList";
import AdminProjectForm from "../../components/AdminProjectForm";
import { getAllProjectsEitherActiveOrInActive } from "../../api/adminAPI";

export default function AdminProjectsPage() {
    const [alert, setAlert] = useState(null);                 // Alert state
    const [projects, setProjects] = useState([]);               //To fetch projects from Backend
    const [selectedProject, setSelectedProject] = useState(null);         // To select projects from the List to Edit
    const [refreshKey, setRefreshKey] = useState(0);                      // To refresh the projects list whenever there projects are added or edited


    // Fetches the List of Projects that are available. 
    useEffect(() => {
        async function getAllProjects() {
            try {
                const response = await getAllProjectsEitherActiveOrInActive();
                setProjects(response || []);
                console.log(response);
            } catch (error) {
                setAlert({
                    type: "error",
                    message: "Failed to load Projects. Contact Admin."
                });
            }
        }
        getAllProjects();
    }, [refreshKey]);

    return (
        /* UI UPDATE: Added main container for full-page background styling */
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* UI UPDATE: Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Project Management
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Add, edit, or manage the visibility of student projects.
                    </p>
                </div>

                {/* UI UPDATE: Wrapped Form in a Card for better visual separation */}
                <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {/* Optional Header for the Form Card */}
                    <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            {selectedProject ? "Edit Selected Project" : "Add New Project"}
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        <AdminProjectForm
                            selectedProject={selectedProject}
                            setAlert={setAlert}
                            onSuccess={() => {
                                setSelectedProject(null);
                                setRefreshKey((k) => k + 1);
                            }}
                            onCancelEdit={() => setSelectedProject(null)}
                        />
                    </div>
                </div>

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

                {/* UI UPDATE: Wrapped List in a Section/Card and removed simple border-t for a cleaner look */}
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900">Existing Projects</h2>
                            <p className="text-sm text-gray-500">List of all active and inactive projects.</p>
                        </div>
                        
                        <AdminProjectList
                            projects={projects}
                            setSelectedProject={setSelectedProject}
                            refreshKey={refreshKey}               // To refetch the subjects after edit or add
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}