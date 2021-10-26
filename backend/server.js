const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");

// App
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.use("/api", userRoutes);

//port
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
