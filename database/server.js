"use strict";

// load package
const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

app.get("/", (req, res) => {
  res.send("helo world ");
});

app.listen(PORT, HOST);

console.log("up and running");
