var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// orders
app.get("/create", (req, res) => {
  var sql = `CREATE TABLE Orders(OrderID ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, CustomerID int FOREIGN KEY REFERENCES Customers(ID), Item VARCHAR(255) FOREIGN KEY REFERENCES Menu(Name));`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

app.get("/", (req, res) => {
  var sql = `SELECT * FROM Orders;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Orders`);
});

app.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE ID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Employeee with id $`);
});

app.get("/insert", (req, res) => {
  var sql = `INSERT INTO Orders (FirstName, LastName, Phone, Email) VALUES (${req.body.firstName}, ${req.body.lastName}, ${req.body.phone}, ${req.body.email})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

app.get("/delete", (req, res) => {
  var sql = `DELETE FROM Orders WHERE ID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete order from table`);
});

module.exports = router;
