const moment = require("moment");

const serverMethods = require("../server");
const connection = serverMethods.connection;
const isLoggedIn = serverMethods.isLoggedIn;
const isEmployee = serverMethods.isEmployee;

var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// unique id
const { v4: uuidv4 } = require("uuid");

// orders
router.get("/", isEmployee, (req, res) => {
  var sql = `SELECT * FROM Orders;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/select/:id", isLoggedIn, (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/open", isEmployee, (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderStatus < 3 ORDER BY OrderCreated DESC;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/closed", isEmployee, (req, res) => {
  var sql = `SELECT * FROM Orders WHERE OrderStatus > 2 ORDER BY OrderCreated DESC;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.post("/update/next", isEmployee, (req, res) => {
  var orderStatusNow = Number.parseInt(req.body.orderStatus) + 1;
  if (req.body.orderStatus == 0) {
    orderStatusNow = 1;
    console.log("req 1");
  }
  var orderCompletedNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  var sql = `UPDATE Orders SET OrderStatus=${orderStatusNow} WHERE (OrderID="${req.body.orderID}" AND CustomerID="${req.body.username}" AND OrderStatus=${req.body.orderStatus} AND ItemName="${req.body.itemName}" AND Quantity=${req.body.quantity});`;

  if (orderStatusNow == 3) {
    sql = `UPDATE Orders SET OrderStatus=${orderStatusNow}, OrderCompleted="${orderCompletedNow}"  WHERE (OrderID="${req.body.orderID}" AND OrderStatus=${req.body.orderStatus} AND CustomerID="${req.body.username}" AND ItemName="${req.body.itemName}" AND Quantity=${req.body.quantity});`;
  }

  if (orderStatusNow < 4) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("status: ", sql);

      res.send(result);
    });
  } else {
    res.send("Cannot cancel order.");
  }
});

router.post("/insert", isLoggedIn, (req, res) => {
  var sql = `INSERT INTO Orders (OrderID, CustomerID, ItemName, Quantity, OrderStatus) VALUES ("${uuidv4()}", "${
    req.user.Username
  }", "${req.body.itemName}", ${req.body.quantity}, 0)`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`order created`);
});

router.get("/customer/open", isLoggedIn, (req, res) => {
  var sql = `SELECT * FROM Orders WHERE (CustomerID="${req.user.Username}" AND OrderStatus < 3) ORDER BY OrderCreated DESC;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/customer/closed", isLoggedIn, (req, res) => {
  var sql = `SELECT * FROM Orders WHERE (CustomerID="${req.user.Username}" AND OrderStatus > 2) ORDER BY OrderCreated DESC`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.post("/customer/cancel", isLoggedIn, (req, res) => {
  if (Number.parseInt(req.body.orderStatus) < 3) {
    var sql = `UPDATE Orders SET OrderStatus = 4, OrderCompleted="${moment(
      new Date()
    ).format("YYYY-MM-DD HH:mm:ss")}" WHERE (OrderID="${
      req.body.orderID
    }" AND CustomerID="${req.user.Username}" AND ItemName="${
      req.body.itemName
    }" AND Quantity=${req.body.quantity})`;
    connection.query(sql, function (err, result) {
      if (err) throw err;

      res.send(result);
    });
  } else {
    res.send("Cannot cancel order.");
  }
});

router.get("/delete", isEmployee, (req, res) => {
  var sql = `DELETE FROM Orders WHERE OrderID = ${req.body.id}`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete order from table`);
});

module.exports = router;
