// app.js
const express = require('express');
const fetchEndpointsMiddleware = require('./src/middlewares/fetchEndpointsMiddleware');
const endpointController = require('./src/controllers/endpointController');

const app = express();

app.use(express.json());
app.use(fetchEndpointsMiddleware); // Middleware to fetch endpoints

// Use the endpointController for handling routes
app.use('/', endpointController);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
