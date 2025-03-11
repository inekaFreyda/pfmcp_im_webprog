const db = require('../config/db');
const bcrypt = require('bcrypt');

const Admin = {
    getByUsername: (username, callback) => {
        db.query('SELECT * FROM admin WHERE admin_username = ?', [username], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0]); // Return the first match or null
        });
    }
};

module.exports = Admin;
