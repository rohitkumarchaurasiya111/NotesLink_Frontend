import { createContext, useState, useEffect } from "react";

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

  //Loading user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("noteslink_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Logout Function
  const logout = () => {
    localStorage.removeItem("noteslink_token");
    localStorage.removeItem("noteslink_user");
    setUser(null);
  };

  //Providing global auth data, this makes these values (user, setUser, logout) available globally 
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}