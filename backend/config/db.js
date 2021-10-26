const mysql = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = require("../config/credentials.js");

const dbConnection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  multipleStatements: true,
});

dbConnection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected to the database");
});

module.exports = dbConnection;
