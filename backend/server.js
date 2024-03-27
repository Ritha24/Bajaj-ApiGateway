const express = require('express');
const cors = require('cors');
const { addData, fetchData, updateData } = require('./databaseService');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Endpoint to handle adding data
app.post('/api/addData', async (req, res) => {
  const { url, baseurl, method } = req.body;
  try {
    await addData(url, baseurl, method);
    res.status(200).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Failed to add data. Please try again.' });
  }
});

// Endpoint to fetch data from the database
app.get('/api/fetchData', async (req, res) => {
  try {
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
  }
});

// Endpoint to handle updating data
app.put('/api/updateData/:id', async (req, res) => {
  const { id } = req.params;
  const { url, baseurl, method } = req.body;
  try {
    await updateData(id, url, baseurl, method);
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Failed to update data. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
