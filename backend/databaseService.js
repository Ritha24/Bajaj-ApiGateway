// backend/databaseService.js
const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gateway'
});

// Function to add data to MySQL
const addData = (url, baseurl, method) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            const sql = 'INSERT INTO endpoints (url, baseurl, method) VALUES (?, ?, ?)';
            connection.query(sql, [url, baseurl, method], (error, results) => {
                connection.release(); // Release the connection after query execution
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
};

// Function to fetch data from the database
const fetchData = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            const sql = 'SELECT * FROM endpoints';
            connection.query(sql, (error, results) => {
                connection.release(); // Release the connection after query execution
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
};

// Function to update data in MySQL
const updateData = (id, url, baseurl, method) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            const sql = 'UPDATE endpoints SET url = ?, baseurl = ?, method = ? WHERE id = ?';
            connection.query(sql, [url, baseurl, method, id], (error, results) => {
                connection.release(); // Release the connection after query execution
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
};

module.exports = { addData, fetchData, updateData };
