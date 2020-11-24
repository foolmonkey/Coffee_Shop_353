const connection = require("../server");

var express = require("express");
var router = express.Router();

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

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Employees WHERE EmployeeID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });

  res.send(`Get employee with id ${req.params.id}`);
});

router.post("/insert", (req, res) => {
  var sql = `INSERT INTO Employees (EmployeeID, FirstName, LastName, Phone, Email) VALUES ("${uuidv4()}", ${
    req.body.firstName
  }", "${req.body.lastName}", ${req.body.phone}, "${req.body.email}");`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created employee`);
});

router.post("/update", (req, res) => {
  var sql = `UPDATE Employees SET FirstName="${req.body.firstName}", LastName="${req.body.lastName}", Phone="${req.body.phone}", Email="${req.body.email}" WHERE EmployeeID=${req.body.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated employee`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Employees WHERE EmployeeID = ${req.body.id};`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete employee with ID ${req.body.id} from table`);
});

module.exports = router;
