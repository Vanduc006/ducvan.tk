// database.js

import mysql from 'mysql'

// Create a database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@Matkhau12345",
  database: "ducvan"
});

export default pool
