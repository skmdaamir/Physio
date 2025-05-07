require("dotenv").config();
const mysql = require("mysql2/promise");
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);

// Creating a single connection that can be used across your app
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the connection pool (can handle multiple requests more efficiently)
module.exports = db;
