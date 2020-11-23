const connection = require("../server");

var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// orders
router.get("/", (req, res) => {
  var sql = `SELECT * FROM Orders;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Orders`);
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Order with id ${req.params.id}`);
});

router.get("/open", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderCompleted IS NULL;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Order with id ${req.params.id}`);
});

router.get("/closed", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderCompleted IS NOT NULL;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get Order with id ${req.params.id}`);
});

router.get("/insert", (req, res) => {
  var sql = `INSERT INTO Orders (CustomerID, ItemName, Quantity) VALUES (${req.body.customerID}, "${req.body.item}", ${req.body.quantity})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Orders WHERE OrderID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete order from table`);
});

module.exports = router;
