// All the code blocks where we are fetching some data using API and giving those data to components, will be here and we will only pass the data to components using react-routers.

import { useContext } from "react";
import { getAllBookDetails, getAllMaterialsForGivenSubject, getAllProjectDetails, getSpecificSubjectDetails, getSubjectListOfSpecificCollegeAndYear } from "../api/userApi";
import { Years } from "../constants/Years";
import { AuthContext } from "../contexts/AuthContext";

// This will fetch the subejcts of Specific Year and college
export const productListingLoader = async ({ request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get("year") || Years[0];
    
    const storedUser = localStorage.getItem("noteslink_user");              //Loader runs outside of the React Tree. So, Using LocalStorage to Extract the User Data
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const college = user?.collegeId || 1;

    const response = await getSubjectListOfSpecificCollegeAndYear(college, year);
    return { products: response.data, year }
}

//This will fetch the materials and subjects details of specific year and college
export const productDetailsLoader = async ({ params }) => {
    const {id} = params;

    let subjectRes = await getSpecificSubjectDetails(id);
    let materialRes = await getAllMaterialsForGivenSubject(id);

    return {specificProduct: subjectRes.data, materials: materialRes.data};
}

//This will fetch all the book details
export const bookListingLoader = async () => {
    let bookRes = await getAllBookDetails();
    return {books: bookRes.data};
}

//This will fetch all the project details
export const projectListingLoader = async () => {
    let projectRes = await getAllProjectDetails();
    return {projects: projectRes.data};
}