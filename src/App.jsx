import './App.css'
import OtherNavbar from './components/OtherNavbar'
import Home from './pages/Home'
import ProductListing from './pages/ProductListing'
import ProductDetails from './pages/ProductDetails'
import ProductOverview from './components/ProductOverview'
import Navbar from './components/navbar'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
