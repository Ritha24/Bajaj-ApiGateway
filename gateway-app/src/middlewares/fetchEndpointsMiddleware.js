const mysql = require('mysql');
const dbConfig = require('../configs/database');

const pool = mysql.createPool(dbConfig);

module.exports = (req, res, next) => {
    const sql = 'SELECT * FROM endpoints';
    pool.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching endpoints from database:', error);
            res.status(500).json({ error: 'Failed to fetch endpoints from database' });
        } else {
            req.endpoints = results;
            next();
        }
    });
};
