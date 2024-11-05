import axios from 'axios';

const API_URL = 'https://your-backend-api.com/api'; // Replace with your backend API URL

export const fetchData = async (endpoint) => {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
};

// Add more API functions as needed
