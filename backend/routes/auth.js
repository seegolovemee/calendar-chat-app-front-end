const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db'); // SQLite database connection

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        db.run(
            `
            INSERT INTO users (name, email, password, isadmin)
            VALUES (?, ?, ?, ?)
        `,
            [name, email, hashedPassword, false], // Save isadmin as false (0) by default
            (err) => {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        res.status(400).json({ message: 'Email already in use' });
                    } else {
                        res.status(500).json({ message: 'Database error' });
                    }
                } else {
                    res.status(201).json({ message: 'User registered successfully. Please login.' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({
                    message: 'Login successful',
                    user: { id: user.id, name: user.name, email: user.email, isadmin: !!user.isadmin },
                });
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        }
    });
});

module.exports = router;
