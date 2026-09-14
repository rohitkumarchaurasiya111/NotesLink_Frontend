import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubjectDetailsSkeleton from "../components/SubjectDetailsSkeleton";

export default function UserLayout() {
  const navigation = useNavigation();

  // If navigating to a subject details page (/subject/:id/:name), render the subject details skeleton immediately
  const isNavigatingToSubjectDetails =
    navigation.state === "loading" &&
    navigation.location?.pathname?.startsWith("/subject/");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />
      <main className="flex-1 w-full">
        {isNavigatingToSubjectDetails ? (
          <SubjectDetailsSkeleton />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}
