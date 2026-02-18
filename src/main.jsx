import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'


// // Disable right-click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// // Block F12 and Ctrl+Shift+I
// document.addEventListener("keydown", function (e) {
//   if (e.key === "F12") {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key === "I") {
//     e.preventDefault();
//   }
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>

  </StrictMode>,
)
