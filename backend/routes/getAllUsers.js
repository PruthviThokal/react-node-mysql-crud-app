const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.get("/users", (req, res) => {
  const dbQuery = "SELECT id, username, email FROM users";
  dbConnection.query(dbQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
