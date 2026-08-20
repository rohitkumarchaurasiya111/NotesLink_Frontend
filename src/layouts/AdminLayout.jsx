import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";


export default function AdminLayout() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Loading:", loading);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if the user is not ADMIN, then they cannot access any admin layout pages
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  console.log(user?.role)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Wrapper */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Top bar (Optional, good for mobile menu triggers later) */}
        {/* <Header /> can go here */}

        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}