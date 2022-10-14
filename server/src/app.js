const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(morgan("combined"));

app.use("/", api);

// app.use(express.static(path.join(__dirname, "client")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

module.exports = app;
