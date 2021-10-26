const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  dbConnection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.send("User deleted successfully.");
    }
  });
});

module.exports = router;
