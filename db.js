// create the connection to the database in this file

require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

// function call created connection that takes an object that is all of our database information
const db = mysql.createConnection({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "knowledge_check_app",
});

// using node utility promisify for async/await
db.query = nodeUtil.promisify(db.query);

module.exports = db;
