import { redirect } from "react-router-dom";
import { UserRole } from "../constants/UserRole";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

//Protects general Private Routes
export function requireAuth({ request }) {
    const storedUser = localStorage.getItem("noteslink_user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        const url = new URL(request.url);
        const redirectTo = url.pathname + url.search;
        throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    }
}

//Protects the Content that are only available for Premium Users
export function requirePremium({ request }) {
    const storedUser = localStorage.getItem("noteslink_user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        const url = new URL(request.url);
        const redirectTo = url.pathname + url.search;
        throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    }

    if (!user || user.role === UserRole.FREE) {
        throw redirect("/");                    //If not Premium, Redirects to Pricing Page
    }
}

//Admin Guard - Protects Admin Dashboard
export function requireAdmin() {
    const storedUser = localStorage.getItem("noteslink_user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        throw redirect("/login");
    }

    if (!user || user.role !== UserRole.ADMIN) {
        throw redirect("/");
    }
}