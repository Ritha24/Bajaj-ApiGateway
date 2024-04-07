// endpointsController.js
const express = require('express');
const DataService = require('../services/dataService');
const CircuitBreaker = require('opossum');
const axios = require('axios');
const fetchEndpointsMiddleware = require('../middlewares/fetchEndpointsMiddleware'); // Import the middleware

const router = express.Router();

// Define a fallback function
const fallbackFunction = async (originalUrl) => {
    try {
        // Make a call to your fallback URL
        console.error(`Failed to fetch data from ${originalUrl}. Falling back to default URL`);
        const response = await axios.get('http://localhost:3012/api/data');
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


// Define routes dynamically based on fetched endpoints
router.use(fetchEndpointsMiddleware); // Place the middleware before defining routes

router.use(async (req, res, next) => {
    try {
        // Loop through fetched endpoints and define routes dynamically
        req.endpoints.forEach(endpoint => {
            // Check if the method is GET
            if (endpoint.method.toUpperCase() === 'GET') {
                // Dynamically define GET routes based on endpoint.url
                const routeUrl = endpoint.url.toLowerCase(); // Ensure URL is lowercase for consistency
                router.get(routeUrl, async (req,res) => {
                    try {
                        // Loop through fetched endpoints
                        for (const endpoint of req.endpoints) {
                            // Check if the method is GET
                            if (endpoint.url === routeUrl) {
                                try {
                                    // Execute the API call through the circuit breaker
                                    const data = await circuitBreaker.fire(endpoint.baseurl).catch(() => {
                                        // Fallback to the fallbackFunction if the request fails
                                        return fallbackFunction(endpoint.baseurl);
                                    });
                                    res.json(data);

                                } catch (error) {
                                    // Handle errors for individual API requests
                                    console.error(`Error fetching data from API for URL ${endpoint.baseurl}:`, error);
                                    res.status(404).json({ error: 'Server is down' }); // Custom error message
                                }
                            }   
                        }
                        // Send the data from the API back to the client side
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
        let failedUrls = new Set(); // Use a Set to store failed URLs

        // Loop through fetched endpoints
        for (const endpoint of req.endpoints) {
            // Check if the method is GET
            if (endpoint.method.toUpperCase() === 'GET') {
                try {
                    // Execute the API call through the circuit breaker
                    const data = await circuitBreaker.fire(endpoint.baseurl).catch(() => {
                        // Add failed URL to the set
                        failedUrls.add(endpoint.baseurl);
                        // Fallback to the fallbackFunction if the request fails
                        return fallbackFunction(endpoint.baseurl);
                    });
                    // Concatenate the data to the result array
                    concatenatedData = concatenatedData.concat(data);
                } catch (error) {
                    // Handle errors for individual API requests
                    console.error(`Error fetching data from API for URL ${endpoint.baseurl}:`, error);
                    // Continue to the next iteration if an error occurs
                    continue;
                }
            }
        }

        // Replace failed URLs with fallback URL in concatenated data
        for (let data of concatenatedData) {
            if (failedUrls.has(data.url)) { // Check if the failedUrls set contains the URL
                data.url = 'http://192.168.1.113:3012/api/data'; // Replace with fallback URL
            }
        }

        // Send the concatenated data back to the client side
        res.json(concatenatedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
