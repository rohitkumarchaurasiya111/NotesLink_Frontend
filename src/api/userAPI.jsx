import api from "./api";

const USER_BASE = "/api/users";

//API call is async so using async-await in these functions
export async function getSubjectListOfSpecificCollegeAndYear(collegeId, year = 1) {
    const response = await api.get(`${USER_BASE}/subjects/college/${collegeId}/year/${year}`);
    return response;
}

export async function getSpecificSubjectDetails(subjectId) {
    const response = await api.get(`${USER_BASE}/subjects/${subjectId}`);
    return response;
}

export async function getAllMaterialsForGivenSubject(subjectId) {
    const response = await api.get(`${USER_BASE}/subjects/${subjectId}/materials`);
    return response;
}

export async function getAllCollegeDetails() {
    const response = await api.get(`${USER_BASE}/colleges`);
    return response;
}

export async function getAllBookDetails() {
    const response = await api.get(`${USER_BASE}/books`);
    return response;
}

export async function getAllProjectDetails() {
    const response = await api.get(`${USER_BASE}/projects`)
    return response;
}