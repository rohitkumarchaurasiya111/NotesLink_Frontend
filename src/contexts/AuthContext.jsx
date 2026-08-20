import { createContext, useState, useEffect } from "react";
import { loginOrRegister } from "../api/authAPI";
import { getUserDetails } from "../api/authAPI";

// Global authentication context in React.
// It:
// Stores the logged-in user in global state
// Loads the user from localStorage when the app starts
// Provides a logout function
// Makes auth data available to all components whenever needed

export const AuthContext = createContext();     //Create Gloabl Context names AuthContext (Context is a way to share data globally)
//AuthContext is the storage, AuthProvider is the one that fills and distributes that storage.
//Wrapper component that provides authentication data to the entire app.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);           //stores logged-in user info
  const [loading, setLoading] = useState(true);


  //Restore session on refresh
  useEffect(() => {
    async function getCurrentUserDetails() {
      try {
        setLoading(true);
        const response = await getUserDetails();

        const { name, email, role, collegeId, collegeLogo } = response.data;
        setUser({ name, email, role, collegeId, collegeLogo });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }

    }
    getCurrentUserDetails();
  }, []);

  //Login Function 
  const login = async (googleIdToken) => {
    const apiResponse = await loginOrRegister(googleIdToken);

    const { token, name, email, role, collegeId, collegeLogo } = apiResponse.data;

    const userData = { name, email, role, collegeId, collegeLogo };
    setUser(userData);
  };

  //Logout Function
  const logout = () => {
    localStorage.removeItem("noteslink_token");
    localStorage.removeItem("noteslink_user");
    setUser(null);
  };

  //Providing global auth data, this makes these values (user, setUser, logout, loading) available globally 
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}