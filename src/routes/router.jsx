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
import { requireAdmin, requireAuth, requirePremium } from "./authGuard";

export const router = createBrowserRouter([
    /* USER ROUTES (UserLayout) */
    {
        path: "/",
        element: <UserLayout />,
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

            // Protected Routes
            {
                path: "subjects",
                element: <ProductListing />,
                loader: async (args) => {          // args is the parameter object that React Router automatically passes to a loader. It contains useful data like:URL parameters, Request object, Route information. You pass args to your loader so it can use that data
                    requireAuth();
                    return productListingLoader(args);
                },
            },
            {
                path: "subject/:id/:name",
                element: <ProductDetails />,
                loader: async (args) => {
                    requireAuth();
                    return productDetailsLoader(args);
                },
            },
            {
                path: "books",
                element: <BookListing />,
                loader: async (args) => {
                    requireAuth();
                    return bookListingLoader(args);
                },
            },
            {
                path: "projects",
                element: <ProjectListing />,
                loader: async (args) => {
                    requirePremium();
                    return projectListingLoader(args);
                },
            },
        ],
    },

    /* ADMIN ROUTES (AdminLayout) */
    {
        path: "/admin",
        element: <AdminLayout />,
        loader: requireAdmin,           //To access the below pages, you need to go through this authGuard
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