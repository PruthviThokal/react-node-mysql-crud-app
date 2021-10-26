const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.post("/adduser", (req, res) => {
  const { username, email, password } = req.body;
  dbConnection.query(
    `INSERT INTO users(username, email, password) VALUES(?,?,?)`,
    [username, email, password],
    (err, result) => {
      if (err) {
        res.status(401).send("User already exists.");
      } else {
        res.send("User added successfully.");
      }
    }
  );
});

module.exports = router;
