const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Fetch admin by username
    Admin.getByUsername(username, (err, admin) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (!admin) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare hashed password
        bcrypt.compare(password, admin.admin_password, (err, match) => {
            if (err) {
                return res.status(500).json({ message: 'Error verifying password', error: err });
            }
            if (!match) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ admin_ID: admin.admin_ID }, 'secret_key', { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        });
    });
};
