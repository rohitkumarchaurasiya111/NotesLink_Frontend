import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

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