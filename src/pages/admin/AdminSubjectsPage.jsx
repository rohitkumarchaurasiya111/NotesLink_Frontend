import { getAllCollegeDetails } from "../../api/userAPI";
import AlertMessage from "../../components/AlertMessage";
import { useEffect, useState, useMemo } from "react";
import { Years } from "../../constants/Years";
import { Branches } from "../../constants/Branches";
import AdminSubjectForm from "../../components/AdminSubjectForm";
import AdminSubjectFilterBar from "../../components/AdminSubjectFilterBar";
import AdminSubjectList from "../../components/AdminSubjectList";

export default function AdminSubjectsPage() {
  const [collegeId, setCollegeId] = useState("");
  const [year, setYear] = useState("");
  const [alert, setAlert] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const isReady = Boolean(collegeId && year);

  const selectedCollegeName = useMemo(() => {
    return colleges.find((c) => c.id === Number(collegeId))?.name;
  }, [colleges, collegeId]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Subject Management
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Configure the curriculum by selecting an institution and academic year below.
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

      {/* Alert Notifications */}
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="space-y-8">
        {/* Subject Form */}
        <section>
          <AdminSubjectForm
            enabled={isReady}
            selectedSubject={selectedSubject}
            onSuccess={() => {
              setSelectedSubject(null);
              setRefreshKey((prev) => prev + 1);
            }}
            onCancelEdit={() => setSelectedSubject(null)}
            collegeId={collegeId}
            collegeName={selectedCollegeName}
            year={year}
            setAlert={setAlert}
            branches={Branches}
          />
        </section>

        {/* Subject List */}
        {isReady && (
          <section className="border-t border-[var(--border-subtle)] pt-8">
            <AdminSubjectList
              enabled={isReady}
              collegeId={collegeId}
              year={year}
              setSelectedSubject={setSelectedSubject}
              refreshKey={refreshKey}
            />
          </section>
        )}
      </div>
    </div>
  );
}