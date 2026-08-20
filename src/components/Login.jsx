import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCollegeDetails } from "../api/userAPI";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { AuthContext } from "../contexts/AuthContext";
import NotesLinkFullLogo from "../assets/NotesLinkFullLogo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading } = useContext(AuthContext);

  const [supportedColleges, setSupportedColleges] = useState([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const redirectPath = location.state?.from || "/subjects";

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath, loading]);

  // Fetch supported colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setIsLoadingColleges(true);
        const response = await getAllCollegeDetails();
        setSupportedColleges(response.data || []);
      } catch (err) {
        console.error("Failed to fetch supported colleges:", err);
      } finally {
        setIsLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  const handleGoogleSuccess = async (googleResponse) => {
    try {
      setError("");
      await login(googleResponse.credential);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f4f8]">
      {/* Visual Brand Side Panel */}
      <div 
        className="hidden md:flex md:w-1/2 lg:w-3/5 relative flex-col justify-center items-center p-10 text-white text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 82, 204, 0.85), rgba(140, 86, 212, 0.85)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 drop-shadow-sm">
          NotesLink
        </h1>
        <p className="text-lg font-light max-w-md opacity-95 leading-relaxed">
          Your centralized college hub. Access curated study notes, syllabus materials, and past papers seamlessly.
        </p>
      </div>

      {/* Auth Form & Colleges Panel */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center bg-[#f8fafc] py-10 px-6 sm:px-12">
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Logo */}
          <img
            src={NotesLinkFullLogo}
            alt="NotesLink Logo"
            className="h-10 w-auto object-contain mb-4"
          />

          {/* Lock Icon */}
          <div className="h-11 w-11 rounded-full bg-[#0052cc] flex items-center justify-center text-white mb-2 shadow-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-5 text-center">
            Sign in to access your college repository.
          </p>

          {/* Notice Alert Box */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-left">
            <div className="flex items-start space-x-3">
              <svg 
                className="w-5 h-5 text-[#0052cc] flex-shrink-0 mt-0.5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                  Authentication Required
                </h4>
                <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                  Please strictly use your <strong>official college email ID</strong> to log in. Personal emails (e.g., @gmail.com) will not grant access to your college hub.
                </p>
              </div>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="w-full flex justify-center mb-3">
            <GoogleLoginButton onSuccess={handleGoogleSuccess} />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 mt-2 text-center font-medium">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="w-full relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#f8fafc] text-slate-500 font-medium tracking-wide">
                Colleges We Support
              </span>
            </div>
          </div>

          {/* Supported Colleges List */}
          <div className="w-full max-h-52 overflow-y-auto pr-1">
            {isLoadingColleges ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#0052cc]"></div>
              </div>
            ) : supportedColleges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {supportedColleges.map((college, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2.5 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-100 hover:border-slate-300 transition-colors"
                  >
                    <img
                      src={college.logoURL}
                      alt={`${college.name} logo`}
                      className="h-7 w-7 rounded-full object-contain border border-slate-100 p-0.5 flex-shrink-0 bg-white"
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {college.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-xs text-slate-500 py-3">
                No supported colleges found at the moment.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}