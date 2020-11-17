var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// customers
router.get("/create", (req, res) => {
  var sql = `CREATE TABLE Customers(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, Phone INT, Email VARCHAR(100), Address VARCHAR(255), OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), CompletionDate TIMESTAMP);`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created customer table`);
});

router.get("/", (req, res) => {
  var sql = `SELECT * FROM Customers;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Customers`);
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Customers WHERE ID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Customer with id ${id}`);
});

router.get("/insert", (req, res) => {
  var sql = `INSERT INTO Customers (FirstName, LastName, Phone, Email, Address) VALUES (${req.body.firstName}, ${req.body.lastName}, ${req.body.phone}, ${req.body.email}, ${req.body.address})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`create a customer`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Customers WHERE ID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete customer from table`);
});

module.exports = router;
