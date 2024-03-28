const express = require('express');
const DataService = require('../services/dataService');
const CircuitBreaker = require('opossum');
const axios = require('axios');

const router = express.Router();

// Define a fallback function
const fallbackFunction = async () => {
    try {
        // Make a call to your fallback URL
        const response = await axios.get('http://192.168.1.113:3012/api/data');
        return response.data;
    } catch (error) {
        // Handle errors for the fallback call
        console.error('Fallback function error:', error);
        throw error;
    }
};

// Create a new circuit breaker instance with fallback function
const circuitBreaker = new CircuitBreaker(DataService.fetchDataFromAPI, {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
    fallback: fallbackFunction // Pass the fallback function
});

// Handle circuit breaker events
circuitBreaker.on('open', () => {
    console.log('Circuit breaker opened');
});

circuitBreaker.on('halfOpen', () => {
    console.log('Circuit breaker half-opened');
});

circuitBreaker.on('close', () => {
    console.log('Circuit breaker closed');
});

// Define routes
router.use((req, res, next) => {
    try {
        // Loop through fetched endpoints and define routes dynamically
        req.endpoints.forEach(endpoint => {
            // Check if the method is GET
            if (endpoint.method.toUpperCase() === 'GET') {
                router.get(endpoint.url, async (req, res) => {
                    try {
                        // Execute the API call through the circuit breaker
                        const data = await circuitBreaker.fire(endpoint.baseurl).catch(() => {
                            // Fallback to the fallbackFunction if the request fails
                            return fallbackFunction();
                        });
                        // Send the data from the API back to the client side
                        res.json(data);
                    } catch (error) {
                        // Handle circuit breaker errors
                        console.error('Circuit breaker error:', error);
                        res.status(500).json({ error: 'Circuit breaker triggered' });
                    }
                });
            }
        });
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to concatenate responses from all endpoints in the database
router.get('/concat/all', async (req, res) => {
    try {
        let concatenatedData = [];
        let failedUrls = [];

        // Loop through fetched endpoints
        for (const endpoint of req.endpoints) {
            // Check if the method is GET
            if (endpoint.method.toUpperCase() === 'GET') {
                try {
                    // Execute the API call through the circuit breaker
                    const data = await circuitBreaker.fire(endpoint.baseurl).catch(() => {
                        // Add failed URL to the list
                        failedUrls.push(endpoint.baseurl);
                        // Fallback to the fallbackFunction if the request fails
                        return fallbackFunction();
                    });
                    // Concatenate the data to the result array
                    concatenatedData = concatenatedData.concat(data);
                } catch (error) {
                    // Handle errors for individual API requests
                    console.error(`Error fetching data from API for URL ${endpoint.baseurl}:`, error);
                }
            }
        }

        // Replace failed URLs with fallback URL in concatenated data
        concatenatedData = concatenatedData.map(data => {
            if (failedUrls.includes(data.url)) {
                data.url = 'http://localhost:3012/api/data'; // Replace with fallback URL
            }
            return data;
        });

        // Send the concatenated data back to the client side
        res.json(concatenatedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;