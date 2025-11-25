// src/libs/apis/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1',
    // Ensure this points to your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
