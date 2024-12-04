import axios from 'axios';

// Base URL for all API requests
const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

// Main API 
const api = {
  
  getCustomers: async () => {
    const response = await axios.get(`${BASE_URL}/customers`);
    return response.data._embedded.customers; 
  },

  getTrainings: async () => {
    const response = await axios.get(`${BASE_URL}/gettrainings`);
    return response.data; 
  },
};

export default api;
