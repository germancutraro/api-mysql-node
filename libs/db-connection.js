const mysql = require('mysql');

const {db_name} = require('../config/');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password :   '',
  database :  db_name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;
