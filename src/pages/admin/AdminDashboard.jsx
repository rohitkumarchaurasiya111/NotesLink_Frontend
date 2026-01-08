import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  DocumentDuplicateIcon,
  FolderIcon,
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
            Overview of your college materials, subjects, projects, and books.
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Stats / Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Manage Subjects Card */}
        <div className="relative group rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-blue-50 p-3 text-blue-700 ring-4 ring-white">
              <AcademicCapIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                <Link to="/admin/subjects">
                  <span className="absolute inset-0" />
                  Manage Subjects
                </Link>
              </h3>
              <p className="text-sm text-gray-500">
                Structure college years & streams.
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-600 font-medium">
            View Details →
          </div>
        </div>

        {/* Manage Materials Card */}
        <div className="relative group rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-purple-50 p-3 text-purple-700 ring-4 ring-white">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                <Link to="/admin/materials">
                  <span className="absolute inset-0" />
                  Manage Materials
                </Link>
              </h3>
              <p className="text-sm text-gray-500">
                Upload notes, PDFs & resources.
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-purple-600 font-medium">
            Go to Library →
          </div>
        </div>

        {/* Manage Projects Card */}
        <div className="relative group rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-green-50 p-3 text-green-700 ring-4 ring-white">
              <FolderIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                <Link to="/admin/projects">
                  <span className="absolute inset-0" />
                  Manage Projects
                </Link>
              </h3>
              <p className="text-sm text-gray-500">
                Add, edit & organize projects.
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600 font-medium">
            Open Projects →
          </div>
        </div>

        {/* ✅ Manage Books Card */}
        <div className="relative group rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all">
          <div className="flex items-center gap-4">
            <span className="inline-flex rounded-lg bg-orange-50 p-3 text-orange-700 ring-4 ring-white">
              <BookOpenIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                <Link to="/admin/books">
                  <span className="absolute inset-0" />
                  Manage Books
                </Link>
              </h3>
              <p className="text-sm text-gray-500">
                Upload & manage reference books.
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-orange-600 font-medium">
            View Books →
          </div>
        </div>

      </div>
    </div>
  );
}
