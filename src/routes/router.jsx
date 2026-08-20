//This file contains all the Routes of our Application. We are using Data Router mode of react-router because it supports route-level data loading, error handling, and scalable architecture.

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import { bookListingLoader, productDetailsLoader, productListingLoader, projectListingLoader } from "./loaders";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSubjectsPage from "../pages/admin/AdminSubjectsPage";
import AdminMaterialsPage from "../pages/admin/AdminMaterialsPage";
import BookListing from "../pages/BookListing";
import ProjectListing from "../pages/ProjectListing";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage";
import AdminBooksPage from "../pages/admin/AdminBooksPage";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import LoginPage from "../pages/LoginPage";
import ErrorSection7 from "../pages/Error404";
import Explore from "../pages/Explore";
// import { requireAdmin, requireAuth, requirePremium } from "./authGuard";

export const router = createBrowserRouter([
    /* USER ROUTES (UserLayout) */
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <ErrorSection7 />,
        children: [
            /* Public Routes */
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "contactus",
                element: <ContactUs />,
            },
            {
                path: "aboutus",
                element: <AboutUs />,
            },
            {
                path: "explore",
                element: <Explore />,
            },

            // Protected Routes
            {
                path: "subjects",
                element: <ProductListing />,
                loader: productListingLoader,
            },
            {
                path: "subject/:id/:name",
                element: <ProductDetails />,
                loader: productDetailsLoader,
            },
            {
                path: "books",
                element: <BookListing />,
                loader: bookListingLoader,
            },
            {
                path: "projects",
                element: <ProjectListing />,
                loader: projectListingLoader,
            },
            // Catch-all 404 Route for unregistered user URLs
            {
                path: "*",
                element: <ErrorSection7 />,
            },
        ],
    },

    /* ADMIN ROUTES (AdminLayout) */
    {
        path: "/admin",
        element: <AdminLayout />,
        // loader: requireAdmin,           //To access the below pages, you need to go through this authGuard
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: "subjects",
                element: <AdminSubjectsPage />,
            },
            {
                path: "materials",
                element: <AdminMaterialsPage />,
            },
            {
                path: "projects",
                element: <AdminProjectsPage />,
            },
            {
                path: "books",
                element: <AdminBooksPage />,
            }
        ],
    },
]);