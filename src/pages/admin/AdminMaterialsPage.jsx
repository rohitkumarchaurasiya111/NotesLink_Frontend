import { getAllCollegeDetails, getAllMaterialsForGivenSubject } from "../../api/userAPI";
import { CustomFullScreenModal } from "../../components/CustomFullScreenModal";
import { Years } from "../../constants/Years";
import { useState, useEffect, useCallback } from "react";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import AdminSubjectFilterBar from "../../components/AdminSubjectFilterBar";
import AdminSubjectList from "../../components/AdminSubjectList";
import AdminSubjectCard from "../../components/AdminSubjectCard";
import AdminCreateMaterialForm from "../../components/AdminMaterialForm";
import MaterialsList from "../../components/MaterialsList";

export default function AdminMaterialsPage() {
  const [collegeId, setCollegeId] = useState("");
  const [year, setYear] = useState("");
  const [alert, setAlert] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    async function getAllColleges() {
      try {
        const response = await getAllCollegeDetails();
        setColleges(response.data || []);
      } catch (error) {
        setAlert({
          type: "error",
          message: "Failed to load colleges. Please try again.",
        });
      }
    }
    getAllColleges();
  }, []);

  const fetchMaterials = useCallback(async () => {
    if (!selectedSubject) return;

    try {
      setLoadingMaterials(true);
      const res = await getAllMaterialsForGivenSubject(selectedSubject.id);
      setMaterials(res.data || []);
    } catch {
      setAlert({
        type: "error",
        message: `Failed to load materials for subject: ${selectedSubject.name}`,
      });
    } finally {
      setLoadingMaterials(false);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (isMaterialModalOpen && selectedSubject) fetchMaterials();
  }, [isMaterialModalOpen, selectedSubject, fetchMaterials]);

  const isReady = Boolean(collegeId && year);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Material Management
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Select an institution and year to view subjects and manage their study materials.
        </p>
      </div>

      {/* Filter Section */}
      <AdminSubjectFilterBar
        colleges={colleges}
        years={Years}
        collegeId={collegeId}
        year={year}
        onCollegeChange={setCollegeId}
        onYearChange={setYear}
      />

      {/* Alert Notifications */}
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Subject List Section */}
      {isReady && (
        <section className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Select a Subject</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Click "Edit" on any subject below to manage its materials.</p>
            </div>
          </div>

          <AdminSubjectList
            enabled={isReady}
            collegeId={collegeId}
            year={year}
            setSelectedSubject={setSelectedSubject}
            onOpenMaterialModal={() => setIsMaterialModalOpen(true)}
          />

          {/* Informational Note */}
          <div className="mt-8 p-4 bg-[var(--accent-light)] border border-[var(--accent)]/20 rounded-xl flex gap-3 text-[var(--text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-[var(--accent)] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="font-semibold text-[var(--text-primary)]">Note:</span> If a subject is missing from this list, navigate to the{" "}
              <a href="/admin/subjects" className="font-semibold text-[var(--accent)] hover:underline">
                Subject Management
              </a>{" "}
              page to create it first.
            </p>
          </div>
        </section>
      )}

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
          <div className="min-h-screen pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
              {/* Modal Subject Header Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm">
                <AdminSubjectCard subject={selectedSubject} />
              </div>

              {/* Form Section */}
              <AdminCreateMaterialForm
                subjectId={selectedSubject.id}
                setAlert={setAlert}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                onMaterialSave={fetchMaterials}
              />

              {/* Modal Alerts */}
              {alert && (
                <AlertMessage
                  type={alert.type}
                  message={alert.message}
                  onClose={() => setAlert(null)}
                />
              )}

              {/* Existing Materials List Section */}
              <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Existing Uploaded Materials
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">Manage or reorder resources already available for this subject.</p>
                  </div>
                  <span className="px-3 py-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-full text-xs font-semibold">
                    {Array.isArray(materials) ? materials.length : 0} items
                  </span>
                </div>

                {loadingMaterials ? (
                  <div className="flex flex-col items-center justify-center py-12 bg-[var(--bg-surface)] rounded-2xl border border-dashed border-[var(--border-subtle)]">
                    <Loader size="lg" message="Loading materials..." />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6 shadow-sm">
                    <MaterialsList
                      materials={materials}
                      editMode={true}
                      onSelectMaterial={setSelectedMaterial}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CustomFullScreenModal>
    </div>
  );
}