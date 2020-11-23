"use strict";

const PORT = 8080;
const HOST = "0.0.0.0";

const express = require("express");

// App
const app = express();

app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// headers
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// routes
var customerRoute = require("./routes/customer.js");
var employeeRoute = require("./routes/employee.js");
var menuRoute = require("./routes/menu.js");
var ordersRoute = require("./routes/orders.js");

app.use("/customer", customerRoute);
app.use("/employee", employeeRoute);
app.use("/menu", menuRoute);
app.use("/orders", ordersRoute);

// mysql database
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.log("Could not connect to database!");
  } else {
    console.log("connected to mysql");
  }
});

// endpoints
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
