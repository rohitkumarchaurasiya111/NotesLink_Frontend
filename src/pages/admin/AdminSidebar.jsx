import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-lg">Admin Panel</div>

      <nav className="flex flex-col gap-1 p-2">
        <NavLink to="/admin" end className="p-2 rounded hover:bg-gray-100">
          Dashboard
        </NavLink>
        <NavLink to="/admin/subjects" className="p-2 rounded hover:bg-gray-100">
          Manage Subjects
        </NavLink>
        <NavLink to="/admin/materials" className="p-2 rounded hover:bg-gray-100">
          Manage Materials
        </NavLink>
      </nav>
    </aside>
  );
}
