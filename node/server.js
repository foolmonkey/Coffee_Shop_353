"use strict";

const express = require("express");

// App
const app = express();

app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "beans101",
  database: "COFFEE",
});

const PORT = 8080;
const HOST = "0.0.0.0";

var customerRoute = require("./routes/customer.js");
var employeeRoute = require("./routes/employee.js");
var menuRoute = require("./routes/menu.js");
var ordersRoute = require("./routes/orders.js");

app.use("/customer", customerRoute);
app.use("/employee", employeeRoute);
app.use("/menu", menuRoute);
app.use("/orders", ordersRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/connect", (req, res) => {
  connection.connect(function (err) {
    if (err) console.log("Could not connect to database!");
  });

  res.send(`Connected to database!`);
});

app.get("/end", (req, res) => {
  connection.end(function (err) {
    if (err) console.log(err);
    console.log("End connection to database");
  });

  res.send(`End connection to database`);
});

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
