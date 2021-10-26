const mysql = require("mysql");
const dbConnection = require("../config/db.js");

exports.loginUser = (req, res) => {
  const { username, email, password } = req.body;
  dbConnection.query(
    `SELECT email, password from users where email='${email}'`,
    [email, password],
    (err, result) => {
      if (err) {
        res.status(401).send("something went wrong");
      } else {
        if (result.length > 0) {
          if (result[0].password === password) {
            res.status(200).json(result);
          } else {
            res.status(401).send("invalid credentials");
          }
        } else {
          res.status(401).send("user not found");
        }
      }
    }
  );
};

exports.addUser = (req, res) => {
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
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  dbConnection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.send("User deleted successfully.");
    }
  });
};

exports.getAllUsers = (req, res) => {
  const dbQuery = "SELECT id, username, email FROM users";
  dbConnection.query(dbQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.updateUser = (req, res) => {
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
};

exports.getSingleUser = (req, res) => {
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
};
