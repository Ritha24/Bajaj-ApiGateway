const axios = require('axios');
const mysql = require('mysql');
const dbConfig = require('../configs/database');

const pool = mysql.createPool(dbConfig);

// Function to fetch data from an API
async function fetchDataFromAPI(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function fetchBaseURL(endpointId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT baseurl FROM endpoints WHERE id = ?';
        pool.query(sql, [endpointId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0].baseurl); // Corrected column name to baseurl
                } else {
                    reject(new Error('Endpoint not found'));
                }
            }
        });
    });
}


// Export both functions
module.exports = {
    fetchDataFromAPI,
    fetchBaseURL
};
