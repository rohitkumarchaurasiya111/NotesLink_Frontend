import { redirect } from "react-router-dom";
import { UserRole } from "../constants/UserRole";

//Protects general Private Routes
export function requireAuth() {
    const token = localStorage.getItem("noteslink_token");

    if (!token) {
        throw redirect("/login");
    }
}

//Protects the Content that are only available for Premium Users
export function requirePremium() {
    const token = localStorage.getItem("noteslink_token");
    const user = JSON.parse(localStorage.getItem("noteslink_user"));

    if (!token) {
        throw redirect("/login");
    }

    if (!user || user.role !== UserRole.PREMIUM) {
        throw redirect("/");                    //If not Premium, Redirects to Pricing Page
    }
}

//Admin Guard - Protects Admin Dashboard
export function requireAdmin() {
    const token = localStorage.getItem("noteslink_token");
    const user = JSON.parse(localStorage.getItem("noteslink_user"));

    if (!token) {
        throw redirect("/login");
    }

    if (!user || user.role !== UserRole.ADMIN) {
        throw redirect("/");
    }
}