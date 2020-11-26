const serverMethods = require("../server");
const connection = serverMethods.connection;
const isLoggedIn = serverMethods.isLoggedIn;
const isEmployee = serverMethods.isEmployee;

var express = require("express");
var router = express.Router();

router.use(isEmployee);

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

//unique id
const { v4: uuidv4 } = require("uuid");

// employees
router.get("/", (req, res) => {
  var sql = `SELECT * FROM Employees;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

router.get("/select/:id", (req, res) => {
  var sql = `SELECT * FROM Employees WHERE EmployeeID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/customerID", (req, res) => {
  var sql = `SELECT CustomerID FROM Customers WHERE Username = "${req.body.username}";`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Employees (EmployeeID) VALUES ("${req.body.id}");`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created employee`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Employees WHERE EmployeeID = ${req.body.id};`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete employee with ID ${req.body.id} from table`);
});

module.exports = router;
