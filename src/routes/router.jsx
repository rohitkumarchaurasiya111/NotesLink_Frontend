//This file contains all the Routes of our Application. We are using Data Router mode of react-router because it supports route-level data loading, error handling, and scalable architecture.

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import { productDetailsLoader, productListingLoader } from "./loaders";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSubjectsPage from "../pages/admin/AdminSubjectsPage";
import AdminMaterialsPage from "../pages/admin/AdminMaterialsPage";

export const router = createBrowserRouter([
    /* =======================
     USER ROUTES (UserLayout)
  ======================= */
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
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
        ],
    },

    /* =======================
       ADMIN ROUTES (AdminLayout)
    ======================= */
    {
        path: "/admin",
        element: <AdminLayout />,
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
        ],
    },
]);