const bcrypt = require('bcrypt');

const plainPassword = 'admin#1234';
bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) throw err;
    console.log('Hashed Password:', hash);
});