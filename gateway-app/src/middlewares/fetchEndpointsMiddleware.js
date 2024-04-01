// fetchEndpointsMiddleware.js
const axios = require('axios');

module.exports = async (req, res, next) => {
    try {
        const fetchDataEndpoint = 'http://localhost:5001/api/fetchData';
        const response = await axios.get(fetchDataEndpoint);
        
        // Assuming the response contains the endpoints data
        req.endpoints = response.data;

        // Log the fetched endpoints
        console.log('Fetched endpoints:', req.endpoints);
        
        next();
    } catch (error) {
        console.error('Error fetching endpoints from endpoint service:', error);
        res.status(500).json({ error: 'Failed to fetch endpoints from endpoint service' });
    }
};
