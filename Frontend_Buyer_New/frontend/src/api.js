import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/",
});

export const googleAuth = (code) => api.get(`api/user/google-login?code=${code}`);