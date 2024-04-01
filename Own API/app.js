const express = require('express');
const app = express();

// Dummy data
const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
];

// Route to get all data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Start the server
const port = process.env.PORT || 3012;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
