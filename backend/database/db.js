const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the database file
const dbPath = path.resolve(__dirname, 'db.sqlite3');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database at', dbPath);
    }
});

// Export the database instance for use in other files
module.exports = db;
