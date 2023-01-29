const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "kimchi510",
  database: "employees_DB"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
