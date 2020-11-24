const connection = require("../server");

var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// unique id
const { v4: uuidv4 } = require("uuid");

// orders
router.get("/", (req, res) => {
  var sql = `SELECT * FROM Orders;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/open", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderCompleted IS NULL;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/closed", (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderCompleted IS NOT NULL;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });

  res.send(`Get Order with id ${req.params.id}`);
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Orders (OrderID, CustomerID, ItemName, Quantity) VALUES ("${uuidv4()}", ${
    req.body.customerID
  }, "${req.body.item}", ${req.body.quantity})`;
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
