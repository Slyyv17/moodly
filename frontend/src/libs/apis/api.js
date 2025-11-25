// src/libs/apis/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://foss-project-burgundy.onrender.com/api/v1',
    // Ensure this points to your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
