import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuIcon } from "../icons/menu-icon";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";
import { AuthContext } from "../contexts/AuthContext";

function LogoText({ user }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={NotesLinkFullLogo}
        alt="NotesLink Logo"
        className="h-8 w-auto object-contain transition-transform hover:scale-105"
      />
      {user?.collegeLogo && (
        <>
          <span className="h-6 w-px bg-gray-300 rounded-full hidden sm:block"></span>
          <img
            src={user.collegeLogo}
            alt="College Logo"
            className="h-8 w-auto object-contain"
          />
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Professional desktop link style with bottom border
  const desktopLinkStyle = ({ isActive }) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 h-full ${isActive
      ? "border-blue-600 text-blue-700"
      : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
    }`;

  // Professional mobile link style with left border
  const mobileLinkStyle = ({ isActive }) =>
    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${isActive
      ? "bg-blue-50 border-blue-600 text-blue-700"
      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
    }`;

  return (
    <div>
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            {/* Left Section: Mobile Menu Button & Logo */}
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:hidden transition"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
              >
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" />
              </button>

              <NavLink to="/" className="flex flex-shrink-0 items-center">
                <LogoText user={user} />
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:space-x-8 h-16 ml-6">
                <NavLink to="/" className={desktopLinkStyle}>
                  Home
                </NavLink>
                <NavLink to="/subjects" className={desktopLinkStyle}>
                  Subjects
                </NavLink>
                <NavLink to="/projects" className={desktopLinkStyle}>
                  Projects
                </NavLink>
                <NavLink to="/books" className={desktopLinkStyle}>
                  Books
                </NavLink>
                <NavLink to="/contactus" className={desktopLinkStyle}>
                  Contact Us
                </NavLink>
                <NavLink to="/aboutus" className={desktopLinkStyle}>
                  About Us
                </NavLink>
                <NavLink to="/explore" className={desktopLinkStyle}>
                  Explore
                </NavLink>
              </div>
            </div>

            {/* Right Section: User Info & Logout */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:flex flex-col items-end justify-center">
                <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                  Hi, {user?.name || "Guest"}
                </span>
              </div>


              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  {!user ?
                    <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Login</a>
                    :
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition"
                    >
                      Logout
                    </button>
                  }
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Mobile Vertical Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
            }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
            <div className="px-3 py-2 sm:hidden mb-2">
              <span className="text-sm font-medium text-gray-500 block">
                Signed in as <strong className="text-gray-900">{user?.name || "Guest"}</strong>
              </span>
            </div>

            <NavLink to="/" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/subjects" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              Subjects
            </NavLink>
            <NavLink to="/projects" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              Projects
            </NavLink>
            <NavLink to="/books" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              Books
            </NavLink>
            <NavLink to="/contactus" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              Contact Us
            </NavLink>
            <NavLink to="/aboutus" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
              About Us
            </NavLink>
            <NavLink to="/explore" className={mobileLinkStyle}>
              Explore
            </NavLink>
          </div>
        </div>
      </nav>
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get Premium Notes, PYQs, Projects, Books for Free
        </p>
      </header>
    </div>
  );
}