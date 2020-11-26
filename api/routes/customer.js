const serverMethods = require("../server");
const connection = serverMethods.connection;
const isLoggedIn = serverMethods.isLoggedIn;
const isEmployee = serverMethods.isEmployee;

var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

//unique id
const { v4: uuidv4 } = require("uuid");

// customers
router.get("/", (req, res) => {
  var sql = `SELECT * FROM Customers;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Customers WHERE CustomerID=${req.params.customerID};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Customers (CustomerID, FirstName, LastName, Email) VALUES ("${req.body.customerID}", "${req.body.firstName}", "${req.body.lastName}", "${req.body.email}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`create a customer`);
});

router.post("/update", isLoggedIn, (req, res) => {
  var sql = `UPDATE Customers SET FirstName="${req.body.firstName}", LastName="${req.body.lastName}", Phone="${req.body.phone}", Email="${req.body.email}", Address="${req.body.address}" WHERE CustomerID=${req.body.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated customer`);
});

router.get("/delete", isEmployee, (req, res) => {
  var sql = `DELETE FROM Customers WHERE CustomerID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete customer from table`);
});

module.exports = router;
