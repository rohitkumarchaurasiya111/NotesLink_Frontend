import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

export default function AdminLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}