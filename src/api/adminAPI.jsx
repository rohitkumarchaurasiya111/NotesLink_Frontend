import axios from 'axios';

//Making an instance of axios with default configurations so that we can use this instance throughout the app
export const adminAPI = axios.create({
    baseURL: 'http://localhost:8080/api/admin',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

//API call is async so using async-await in these functions

//Subject
export async function createSubject(payload) {
    const response = await adminAPI.post("/subject", payload,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}

//Material
export async function createMaterial(material, file) {
    if (!file) {
        throw new Error("File is required to create material");
    }
    const formData = new FormData();

    // Convert material JSON → Blob as backend expects this
    formData.append(
        "material",
        new Blob([JSON.stringify(material)], {
            type: "application/json",
        })
    );

    // Append file
    formData.append("file", file);

    const response = await adminAPI.post("/material", formData);
    return response.data;
}

export async function updateMaterial(id, material) {
    const response = await adminAPI.put(`/material/${id}`, material,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}

//Project
export async function getAllProjectsEitherActiveOrInActive() {
    const response = await adminAPI.get(`/project/all`);
    return response.data;
}

export async function addProject(projectPayload) {
    const response = await adminAPI.post(`/project`, projectPayload, { headers: { "Content-Type": "application/json" } });
    return response.data;
}

export async function updateProject(projectPayload, id) {
    const response = await adminAPI.put(`/project/${id}`, projectPayload);
    return response.data;
}

//Book
export async function getAllBooksEitherActiveOrInactive() {
    const response = await adminAPI.get(`/book/all`);
    return response.data;
}

export async function createBook(book, file) {
    if (!file) {
        throw new Error("File is required to create book");
    }
    const formData = new FormData();

    // Convert material JSON → Blob as backend expects this
    formData.append(
        "book",
        new Blob([JSON.stringify(book)], {
            type: "application/json",
        })
    );

    // Append file
    formData.append("file", file);

    const response = await adminAPI.post("/book", formData);
    return response.data;
}

export async function updateBook(id, book) {
    const response = await adminAPI.put(`/book/${id}`, book,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}