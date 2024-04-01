//app.js
const express = require('express');
const fetchEndpointsMiddleware = require('./src/middlewares/fetchEndpointsMiddleware'); // Adjust the path accordingly
const endpointController = require('./src/controllers/endpointController');

const app = express();

app.use(express.json());
app.use(fetchEndpointsMiddleware); // Register the middleware before the controller

// Use the endpointController for handling routes
app.use('/', endpointController);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the app for testing purposes or further usage
