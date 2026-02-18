import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import AdminSubjectsPage from './pages/admin/AdminSubjectsPage'
import AdminMaterialsPage from './pages/admin/AdminMaterialsPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  return (
    //GoogleOAuthProvider makes Google login functionality available to entire React app.
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
