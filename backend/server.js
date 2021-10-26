const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

const userLogin = require("./routes/userLogin");
const getAllUsers = require("./routes/getAllUsers");
const getUser = require("./routes/getUser");
const addUser = require("./routes/addUser");
const updateUser = require("./routes/updateUser");
const deleteUser = require("./routes/deleteUser");

// App
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.use("/api", userLogin);
app.use("/api", getAllUsers);
app.use("/api", getUser);
app.use("/api", addUser);
app.use("/api", updateUser);
app.use("/api", deleteUser);

//port
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
