const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: '00_philfed'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});
module.exports = db;
