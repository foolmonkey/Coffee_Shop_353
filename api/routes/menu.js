const serverMethods = require("../server");
const connection = serverMethods.connection;
const isLoggedIn = serverMethods.isLoggedIn;
const isEmployee = serverMethods.isEmployee;

var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
const { query } = require("express");
router.use(bodyParser.urlencoded({ extended: true }));

// menu
router.get("/", async (req, res) => {
  var sql = `SELECT * FROM Menu;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/categories", async (req, res) => {
  var sql = `SELECT DISTINCT(Category) FROM Menu;`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/categories/:category", async (req, res) => {
  var sql = `SELECT * FROM Menu WHERE Category=${req.params.category};`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/insert", isLoggedIn, isEmployee, async (req, res) => {
  if (Number.parseFloat(req.body.price) !== NaN) {
    var sql = `INSERT INTO Menu (ItemName, Description, Category, Price) VALUES (
      "${req.body.name}", 
      "${req.body.description}",
      "${req.body.category}", 
      "${req.body.price}");`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });

    res.send(`Added ${req.body.name} to menu!`);
  } else {
    res.send("Couldn't add item to menu.");
  }
});

router.post("/update", isLoggedIn, isEmployee, async (req, res) => {
  var sql = `UPDATE Menu SET ItemName="${req.body.newName}", 
  Description = "${req.body.description}",
  Category="${req.body.category}", 
  Price="${req.body.price}"
  WHERE ItemName="${req.body.name}";`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Updated menu item with name ${req.body.name}`);
});

router.post("/delete", isLoggedIn, isEmployee, async (req, res) => {
  var sql = `DELETE FROM Menu WHERE ItemName ="${req.body.name}"`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send(`Delete ${req.body.name} from menu`);
});

module.exports = router;
