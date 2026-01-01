import axios from 'axios';

//Making an instance of axios with default configurations so that we can use this instance throughout the app
export const adminAPI = axios.create({
    baseURL: 'http://localhost:8080/api/admin',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})

//API call is async so using async-await in these functions
export async function createSubject(payload) {
    const response = await adminAPI.post("/subject", payload,
        { headers: { "Content-Type": "application/json" } });
    return response.data;
}

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