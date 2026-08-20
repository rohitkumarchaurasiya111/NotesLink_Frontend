import api from './api';

const AUTH_BASE = '/api/auth'

//Login and Register API
export async function loginOrRegister(googleIdToken) {
    // Send token to backend
    const response = await api.post(`${AUTH_BASE}/loginwithgoogle`, {
        idToken: googleIdToken,
    });
    return response;
}

export async function getUserDetails() {
    const response = await api.get(`${AUTH_BASE}/me`);
    return response;
}