const db = require('../database/db');
const bcrypt = require('bcrypt');

// Initialize the database
db.serialize(() => {
    // Check if the "users" table exists
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
        if (err) {
            console.error('Error checking table:', err.message);
            return;
        }

        // If the "users" table does not exist, create it
        if (!row) {
            console.log('Initializing database: Creating "users" table');
            db.run(`
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name SERIAL NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT,
                    isAdmin BOOLEAN DEFAULT FALSE
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                    return db.close();
                }

                console.log('"users" table created successfully');

                const password = bcrypt.hashSync('123456', 10);

                // Insert initial data into the database
                db.run(
                    `
                    INSERT INTO users (name, email, password, isAdmin)
                    VALUES (?, ?, ?, ?)
                    `,
                    ['Harry', 'suerte.668@gmail.com', password, true],
                    (err) => {
                        if (err) {
                            console.error('Error inserting initial data:', err.message);
                        } else {
                            console.log('Initial data inserted successfully.');
                        }
                    },

                    // Close the database after all operations
                    db.close((err) => {
                        if (err) {
                            console.error('Error closing database:', err.message);
                        } else {
                            console.log('Database connection closed');
                        }
                    })
                );

            });
        } else {
            console.log('Database already initialized');
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    });
});
