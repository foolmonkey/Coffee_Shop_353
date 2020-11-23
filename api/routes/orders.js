var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// orders
router.get("/create", (req, res) => {
  var sql = `CREATE TABLE Orders(OrderID ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, CustomerID int FOREIGN KEY REFERENCES Customers(ID), Item VARCHAR(255) FOREIGN KEY REFERENCES Menu(Name), OrderCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), OrderCompleted TIMESTAMP);`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

router.get("/", (req, res) => {
  var sql = `SELECT * FROM Orders;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Orders`);
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE ID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Employeee with id $`);
});

router.get("/insert", (req, res) => {
  var sql = `INSERT INTO Orders (FirstName, LastName, Phone, Email) VALUES (${req.body.firstName}, ${req.body.lastName}, ${req.body.phone}, ${req.body.email})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Orders WHERE ID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete order from table`);
});

module.exports = router;
