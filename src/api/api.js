import axios from "axios";

//Making an instance of axios with default configurations so that we can use this instance throughout the app
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,         //Request will stop after 10 seconds -> Prevents the app from hanging if the server doesn’t respond
})

/* Attach JWT - This one runs before every request. - Not required as we have switched to HttpOnly Cookie */
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("noteslink_token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

/* Handle Unauthorized - This runs after every response. */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            //Remove Cookies 
            window.location.href = "/login";
        }
        // if (error.response?.status === 403) {
        //     window.location.href = "/";
        // }
        return Promise.reject(error);
    }
);


export default api;