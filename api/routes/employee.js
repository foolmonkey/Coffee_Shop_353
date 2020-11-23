var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// employees
router.get("/create", (req, res) => {
  var sql = `CREATE TABLE Employees(ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, Phone VARCHAR(30), Email VARCHAR(100), CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP());`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created menu table`);
});

router.get("/", (req, res) => {
  var sql = `SELECT * FROM Employees;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get employees`);
});

router.get("/:id", (req, res) => {
  var sql = `SELECT * FROM Employees WHERE ID=${req.params.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Get employee with id ${req.params.id}`);
});

router.get("/insert", (req, res) => {
  var sql = `INSERT INTO Employees (FirstName, LastName, Phone, Email) VALUES ("${req.body.firstName}", "${req.body.lastName}", ${req.body.phone}, "${req.body.email}");`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Created employee`);
});

router.post("/update", (req, res) => {
  var sql = `UPDATE Employees SET FirstName="${req.body.firstName}", LastName="${req.body.lastName}", Phone=${req.body.phone}, Email="${req.body.email}" WHERE ID=${req.body.id};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated employee`);
});

router.get("/delete", (req, res) => {
  var sql = `DELETE FROM Employees WHERE ID = ${req.body.id};`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete employee with ID ${req.body.id} from table`);
});

module.exports = router;
