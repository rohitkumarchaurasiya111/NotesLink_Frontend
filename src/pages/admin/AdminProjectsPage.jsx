import { useEffect, useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import AdminProjectList from "../../components/AdminProjectList";
import AdminProjectForm from "../../components/AdminProjectForm";
import { getAllProjectsEitherActiveOrInActive } from "../../api/adminAPI";

export default function AdminProjectsPage() {
  const [alert, setAlert] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function getAllProjects() {
      try {
        const response = await getAllProjectsEitherActiveOrInActive();
        setProjects(response || []);
      } catch (error) {
        setAlert({
          type: "error",
          message: "Failed to load projects from database",
        });
      }
    }
    getAllProjects();
  }, [refreshKey]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Project Management
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Add, edit, or configure the visibility and details of student projects.
        </p>
      </div>

      {/* Form Section */}
      <div>
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

      {/* Alert Notification */}
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* List Section */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm">
        <AdminProjectList
          projects={projects}
          setSelectedProject={setSelectedProject}
        />
      </section>
    </div>
  );
}