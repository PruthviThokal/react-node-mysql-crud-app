const router = require("express").Router();
const mysql = require("mysql");
const dbConnection = require("../config/db.js");
const {
  loginUser,
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getSingleUser,
} = require("../controller/user");

router.route("/login").post(loginUser);
router.route("/adduser").post(addUser);
router.route("/deleteuser/:id").delete(deleteUser);
router.route("/users").get(getAllUsers);
router.route("/updateuser/:id").put(updateUser);
router.route("/user/:id").get(getSingleUser);

module.exports = router;
