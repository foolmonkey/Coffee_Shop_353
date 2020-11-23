const connection = require("../server");

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
  });

  res.send(`Get Customers`);
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Customers WHERE CustomerID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Customer with id ${req.params.id}`);
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Customers (CustomerID, FirstName, LastName, Phone, Email, Address) VALUES ("${uuidv4()}", "${
    req.body.firstName
  }", "${req.body.lastName}", "${req.body.phone}", "${req.body.email}", "${
    req.body.address
  }")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`create a customer`);
});

router.post("/update", (req, res) => {
  var sql = `UPDATE Customers SET FirstName="${req.body.firstName}", LastName="${req.body.lastName}", Phone="${req.body.phone}", Email="${req.body.email}", Address="${req.body.address}" WHERE CustomerID=${req.body.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated customer`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Customers WHERE CustomerID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete customer from table`);
});

module.exports = router;
