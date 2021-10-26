const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const dbConnection = require("../config/db.js");

router.get("/login", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
