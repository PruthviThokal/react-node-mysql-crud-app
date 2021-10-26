const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const dbQuery = `SELECT id, username, email, password FROM users WHERE id=${id}`;
  dbConnection.query(dbQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("No user found.");
      }
    }
  });
});

module.exports = router;
