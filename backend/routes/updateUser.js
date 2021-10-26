const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.put("/updateuser/:id", (req, res) => {
  const { updateUser, updatePass } = req.body;
  const id = req.params.id;
  dbConnection.query(
    `UPDATE users SET username = ?, password= ? WHERE id=${id}`,
    [updateUser, updatePass],
    (err, result) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.send("User updated successfully.");
      }
    }
  );
});

module.exports = router;
