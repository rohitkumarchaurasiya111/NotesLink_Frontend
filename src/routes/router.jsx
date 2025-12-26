//This file contains all the Routes of our Application. We are using Data Router mode of react-router because it supports route-level data loading, error handling, and scalable architecture.

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductListing from "../pages/ProductListing";
import ProductDetails from "../pages/ProductDetails";
import Home from "../pages/Home";
import { productDetailsLoader, productListingLoader } from "./loaders";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/subjects",
            element: <ProductListing />,
            loader: productListingLoader,
        },
        {
            path: "/subject/:id/:name",
            element: <ProductDetails />,
            loader: productDetailsLoader,
        },
    ]
);
