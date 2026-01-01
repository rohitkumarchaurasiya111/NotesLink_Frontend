import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import AdminSubjectsPage from './pages/admin/AdminSubjectsPage'
import AdminMaterialsPage from './pages/admin/AdminMaterialsPage'

function App() {
  return (
    <>
     <RouterProvider router={router} />
     {/* <AdminSubjectsPage /> */}
     {/* <AdminMaterialsPage /> */}
    </>
  )
}

export default App
