import axios from 'axios';

//Making an instance of axios with default configurations so that we can use this instance throughout the app
export const userAPI = axios.create({
    baseURL: 'http://localhost:8080/api/users',
    headers: {
        'Content-Type': 'application/json',
    },
})

//API call is async so using async-await in these functions
export async function getSubjectListOfSpecificCollegeAndYear(collegeId, year=1) {
    const response = await userAPI.get(`/subjects/college/${collegeId}/year/${year}`);
    return response;
}

export async function getSpecificSubjectDetails(subjectId){
    const response = await userAPI.get(`/subjects/${subjectId}`);
    return response;
}

export async function getAllMaterialsForGivenSubject(subjectId) {
    const response = await userAPI.get(`/subjects/${subjectId}/materials`);
    return response;
}