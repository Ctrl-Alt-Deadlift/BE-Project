import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/",
    // withCredentials: true,
});
// port was changed from 8080 to 4001 to match the backend server port
export const googleAuth = (code) => api.get(`api/user/google-login?code=${code}`);