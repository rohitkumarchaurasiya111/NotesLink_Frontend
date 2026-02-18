import api from './api';

const ADMIN_BASE = "/api/admin";

//Subject
export async function createSubject(payload) {
    const response = await api.post(`${ADMIN_BASE}/subject`, payload,
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

    const response = await api.post(`${ADMIN_BASE}/material`, formData);
    return response.data;
}

export async function updateMaterial(id, material) {
    const response = await api.put(`${ADMIN_BASE}/material/${id}`, material,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}

//Project
export async function getAllProjectsEitherActiveOrInActive() {
    const response = await api.get(`${ADMIN_BASE}/project/all`);
    return response.data;
}

export async function addProject(projectPayload) {
    const response = await api.post(`${ADMIN_BASE}/project`, projectPayload, { headers: { "Content-Type": "application/json" } });
    return response.data;
}

export async function updateProject(projectPayload, id) {
    const response = await api.put(`${ADMIN_BASE}/project/${id}`, projectPayload);
    return response.data;
}

//Book
export async function getAllBooksEitherActiveOrInactive() {
    const response = await api.get(`${ADMIN_BASE}/book/all`);
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

    const response = await api.post(`${ADMIN_BASE}/book`, formData);
    return response.data;
}

export async function updateBook(id, book) {
    const response = await api.put(`${ADMIN_BASE}/book/${id}`, book,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}