import { Link, NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  FolderIcon,
  AcademicCapIcon,
  DocumentDuplicateIcon,
  Squares2X2Icon, //Added for project section
  UserCircleIcon, // Added for the profile section
  ArrowRightOnRectangleIcon // Added for logout simulation
} from "@heroicons/react/24/outline";
import NotesLinkFullLogo from "../../assets/NotesLinkFullLogo.png"

export default function AdminSidebar() {
  const navItems = [
    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: AcademicCapIcon,
    },
    {
      name: "Materials",
      path: "/admin/materials",
      icon: DocumentDuplicateIcon,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderIcon,
    },
    {
      name: "Books",
      path: "/admin/books",
      icon: BookOpenIcon,
    },
  ];

  return (
    <aside className={`flex h-full w-72 flex-col border-r border-gray-200 bg-white`}>
      {/* Brand / Identity */}
      <div className="flex flex-col items-center justify-center border-b border-gray-200/60 py-8 bg-white">
        <Link
          to="/admin"
          className={`inline-flex items-center`}
          aria-label="Go to NotesLink Home"
        >
          <img
            src={NotesLinkFullLogo}
            alt="NotesLink"
            className={`h-8 w-auto select-none`}
            draggable={false}
          />
        </Link>
        {/* Admin Badge */}
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-sm ring-1 ring-inset ring-gray-500/10">
            Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-all duration-200
                  ${isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-6 w-6 shrink-0 transition-colors ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"
                        }`}
                      aria-hidden="true"
                    />
                    {name}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Admin User
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View Profile
              </p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}