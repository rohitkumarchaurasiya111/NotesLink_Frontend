import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your college materials and subjects database.
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Stats / Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Manage Subjects Card */}
        <div className="relative group rounded-xl bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700 ring-4 ring-white">
              <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <Link to="/admin/subjects" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Manage Subjects
                </Link>
              </h3>
              <p className="text-sm text-gray-500">Structure college years & streams.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-2 text-sm text-blue-600 font-medium group-hover:text-blue-500">
            View Details <span aria-hidden="true">&rarr;</span>
          </div>
        </div>

        {/* Manage Materials Card */}
        <div className="relative group rounded-xl bg-white p-6 focus-within:ring-2 focus-within:ring-indigo-500 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-purple-50 p-3 text-purple-700 ring-4 ring-white">
              <DocumentDuplicateIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <Link to="/admin/materials" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Manage Materials
                </Link>
              </h3>
              <p className="text-sm text-gray-500">Upload notes, PDFs & resources.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-2 text-sm text-purple-600 font-medium group-hover:text-purple-500">
            Go to Library <span aria-hidden="true">&rarr;</span>
          </div>
        </div>

        {/* Placeholder / Coming Soon */}
        <div className="relative rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition">
          <BookOpenIcon className="h-10 w-10 text-gray-300 mb-3" />
          <h3 className="text-sm font-semibold text-gray-900">More Features</h3>
          <p className="mt-1 text-sm text-gray-500">Projects & Books coming soon.</p>
        </div>

      </div>
    </div>
  );
}